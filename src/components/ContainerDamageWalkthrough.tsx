'use client'

/**
 * V6 Direction Deploy — placeholder data.
 *
 * Zone classification codes and severity wording are mocked-plausible,
 * pending verification against Bernardo's IICL ECS output.
 * Photo URLs land in a follow-up commit.
 *
 * See: /docs/v6-reference-widget.html for behavior reference
 */

import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Radar, RefreshCw, X, Camera } from 'lucide-react'

// ──────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────

interface Zone {
  id: string
  label: string
  title: string
  codes: string[]
  severity: 'major' | 'moderate' | 'minor'
  severityLabel: string
  caption: string
  worldPos: [number, number, number]
  face: '+z' | '-z' | '+x' | '-x' | '+y' | '-y'
}

// ──────────────────────────────────────────────────────────────────────────
// Data
// ──────────────────────────────────────────────────────────────────────────

const ZONES: Zone[] = [
  {
    id: 'dent',
    label: 'Right side panel — section 3',
    title: 'Impact dent — major',
    codes: ['RSP — RIGHT SIDE PANEL', 'DT — DENTED', 'IN — INSERT PANEL'],
    severity: 'major',
    severityLabel: 'Major — structural',
    caption:
      'Visible impact deformation, approximately 15cm × 8cm. Panel integrity compromised. Full panel insert recommended before next voyage.',
    worldPos: [0.6, 0.15, 0.86],
    face: '+z',
  },
  {
    id: 'corrosion',
    label: 'Cargo doors — lower right hinge',
    title: 'Rust corrosion — moderate',
    codes: ['DRR — DOOR RIGHT REAR', 'RS — RUST/CORROSION', 'RP — REPAIR PATCH'],
    severity: 'moderate',
    severityLabel: 'Moderate — cosmetic + spread risk',
    caption:
      'Surface corrosion spreading from door seal interface, ~20cm × 30cm. Repair patch recommended within 30 days to prevent through-rust.',
    worldPos: [-2.02, -0.4, 0.5],
    face: '-x',
  },
  {
    id: 'scrape',
    label: 'Left side panel — section 1',
    title: 'Surface scrape — minor',
    codes: ['LSP — LEFT SIDE PANEL', 'SC — SCRATCHED', 'PA — REPAINT'],
    severity: 'minor',
    severityLabel: 'Minor — surface only',
    caption:
      'Paint stripped along 40cm horizontal line, likely yard contact. No structural concern. Standard repaint at next maintenance window.',
    worldPos: [0.4, 0.25, -0.86],
    face: '-z',
  },
]

// V6 Phase 4 photos — Makoto-confirmed mapping from public/assets/damage/.
// Fallback (teal gradient + Camera icon) still renders if any path is empty
// or the image fails to load; render path uses object-fit: cover with center
// background-position.
const IMAGES: Record<string, string> = {
  dent: '/assets/damage/9.jpeg',
  corrosion: '/assets/damage/12.jpeg',
  scrape: '/assets/damage/5.jpeg',
}

// ──────────────────────────────────────────────────────────────────────────
// Constants — scan / camera timing (slowed from v5 baseline to give the
// vision camera + scan sweep time to read).
// ──────────────────────────────────────────────────────────────────────────

const CELL_STAGGER = 32 // ms between adjacent cell starts
const CELL_RAMP = 160 // ms fade-in to peak
const CELL_HOLD = 120 // ms at peak opacity 0.7
const CELL_FADE = 280 // ms fade-out
const CELL_FULL = CELL_RAMP + CELL_HOLD + CELL_FADE // 560

const CAM_ENTRY_DUR = 800 // fade-in + x-glide from -4.5 → -3.5
const CAM_EXIT_DUR = 400 // fade-out + x-glide from -3.5 → -4.5
const CAM_SETTLE = 200 // beat after camera fully in, before sweep starts

const COLS = 8
const ROWS = 4

// Severity pill colors per the reference widget — literal hex (not in the
// project palette; intentionally light pastels for inside the dark card).
const SEVERITY_STYLES: Record<Zone['severity'], { bg: string; ink: string }> = {
  major: { bg: '#FCEBEB', ink: '#791F1F' },
  moderate: { bg: '#FAEEDA', ink: '#633806' },
  minor: { bg: '#EAF3DE', ink: '#27500A' },
}

// ──────────────────────────────────────────────────────────────────────────
// Component
// ──────────────────────────────────────────────────────────────────────────

export function ContainerDamageWalkthrough() {
  // React state — drives card render + reveal class toggles.
  const [activeZoneId, setActiveZoneId] = useState<string | null>(null)
  const [summaryVisible, setSummaryVisible] = useState(false)
  const [replayVisible, setReplayVisible] = useState(false)
  const [helperVisible, setHelperVisible] = useState(false)
  const [discoveredZones, setDiscoveredZones] = useState<Set<string>>(new Set())
  // Severity-row reveal state for the persistent scan-summary card. Rows
  // stagger in 100ms apart starting 200ms after the card header appears,
  // or all-immediate under prefers-reduced-motion.
  const [summaryRowsVisible, setSummaryRowsVisible] = useState<Set<string>>(new Set())

  // DOM refs.
  const wrapperRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hotspotsRef = useRef<Map<string, HTMLButtonElement>>(new Map())

  // Mutable scan state — refs so the raf loop reads fresh values without
  // re-creating closures, and so timeouts don't pile re-renders.
  const isScanningRef = useRef(false)
  const isHoveringRef = useRef(false)
  const lastInteractionRef = useRef<number>(0)
  const camEntryStartRef = useRef(-1)
  const camExitStartRef = useRef(-1)
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const wasVisibleRef = useRef(false)
  // Matched once at mount; if true, the runScanSequence skips the row-stagger
  // and reveals all summary rows immediately when summaryVisible flips on.
  const prefersReducedMotionRef = useRef(false)

  // Mirror activeZoneId into a ref so the raf loop can read the current
  // value without re-creating the loop on every state change.
  const activeZoneIdRef = useRef<string | null>(null)
  useEffect(() => {
    activeZoneIdRef.current = activeZoneId
  }, [activeZoneId])

  // Replay-button handler indirection. The actual runScanSequence function
  // is defined inside the init effect (it closes over scene objects); we
  // expose it via this ref so the button onClick can reach it.
  const runScanSequenceRef = useRef<(() => void) | null>(null)

  // Init effect — runs once on mount, full cleanup on unmount.
  useEffect(() => {
    const wrapper = wrapperRef.current
    const canvas = canvasRef.current
    if (!wrapper || !canvas) return

    // Reset all mutable refs (defensive against Strict Mode re-mount).
    isScanningRef.current = false
    isHoveringRef.current = false
    lastInteractionRef.current = performance.now()
    camEntryStartRef.current = -1
    camExitStartRef.current = -1
    timeoutsRef.current = []
    wasVisibleRef.current = false
    prefersReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const isMobile = () => window.innerWidth < 641

    // ─── Scene + camera + renderer ────────────────────────────────────
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(isMobile() ? 42 : 38, 1, 0.1, 100)
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = false
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const resize = () => {
      const w = wrapper.clientWidth
      const h = wrapper.clientHeight
      if (w === 0 || h === 0) return
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.fov = isMobile() ? 42 : 38
      if (isMobile()) camera.position.set(5.8, 3.2, 5.4)
      else camera.position.set(6.5, 3.6, 6.0)
      camera.lookAt(0, 0, 0)
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    // ─── Lights ───────────────────────────────────────────────────────
    const ambient = new THREE.AmbientLight(0xffffff, 0.55)
    scene.add(ambient)
    const key = new THREE.DirectionalLight(0xffffff, 0.9)
    key.position.set(5, 8, 5)
    scene.add(key)
    const fill = new THREE.DirectionalLight(0x88aaff, 0.25)
    fill.position.set(-5, 3, -3)
    scene.add(fill)

    // ─── Container ────────────────────────────────────────────────────
    const containerGroup = new THREE.Group()
    scene.add(containerGroup)

    const W = 4.0,
      H = 1.8,
      D = 1.7
    const halfW = W / 2,
      halfD = D / 2

    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0xc14a35,
      roughness: 0.7,
      metalness: 0.15,
    })
    const corrugationMat = new THREE.MeshStandardMaterial({
      color: 0xa83d2a,
      roughness: 0.75,
      metalness: 0.18,
    })
    const bodyGeo = new THREE.BoxGeometry(W, H, D)
    const body = new THREE.Mesh(bodyGeo, bodyMat)
    containerGroup.add(body)

    const ribGeo = new THREE.BoxGeometry(0.06, H * 0.9, 0.01)
    for (let i = -8; i <= 8; i++) {
      const xPos = (i / 8) * (W * 0.46)
      const rib = new THREE.Mesh(ribGeo, corrugationMat)
      rib.position.set(xPos, 0, halfD + 0.005)
      containerGroup.add(rib)
      const rib2 = new THREE.Mesh(ribGeo, corrugationMat)
      rib2.position.set(xPos, 0, -halfD - 0.005)
      containerGroup.add(rib2)
    }

    const doorMat = new THREE.MeshStandardMaterial({
      color: 0xa53726,
      roughness: 0.75,
      metalness: 0.18,
    })
    const doorGeo = new THREE.BoxGeometry(0.02, H, D)
    const doors = new THREE.Mesh(doorGeo, doorMat)
    doors.position.set(-halfW - 0.011, 0, 0)
    containerGroup.add(doors)

    const handleMat = new THREE.MeshStandardMaterial({
      color: 0x2a2d33,
      roughness: 0.5,
      metalness: 0.7,
    })
    const handleGeo = new THREE.CylinderGeometry(0.025, 0.025, H * 0.85, 8)
    for (let i = 0; i < 4; i++) {
      const handle = new THREE.Mesh(handleGeo, handleMat)
      handle.position.set(-halfW - 0.025, 0, -halfD * 0.7 + i * (D * 0.45))
      containerGroup.add(handle)
    }

    // ─── Scan grid (+z face) ──────────────────────────────────────────
    const cellW = (W * 0.92) / COLS
    const cellH = (H * 0.88) / ROWS
    const cellGeo = new THREE.PlaneGeometry(cellW * 0.92, cellH * 0.92)
    type ScanCell = {
      mat: THREE.MeshBasicMaterial
      col: number
      row: number
      fadeStart: number
    }
    const scanCells: ScanCell[] = []
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const mat = new THREE.MeshBasicMaterial({
          color: 0x5dcaa5,
          transparent: true,
          opacity: 0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          side: THREE.DoubleSide,
        })
        const mesh = new THREE.Mesh(cellGeo, mat)
        mesh.position.set(
          -W * 0.46 + c * cellW + cellW / 2,
          H * 0.44 - r * cellH - cellH / 2,
          halfD + 0.012,
        )
        containerGroup.add(mesh)
        scanCells.push({ mat, col: c, row: r, fadeStart: -1 })
      }
    }

    // ─── Vision camera (world space — NOT parented to containerGroup) ─
    const visionCameraGroup = new THREE.Group()
    visionCameraGroup.visible = false

    const camBodyMat = new THREE.MeshStandardMaterial({
      color: 0x2a2d33,
      roughness: 0.5,
      metalness: 0.7,
      transparent: true,
      opacity: 0,
    })
    const camTrimMat = new THREE.MeshStandardMaterial({
      color: 0x4a5058,
      roughness: 0.4,
      metalness: 0.6,
      transparent: true,
      opacity: 0,
    })
    const lensGlassMat = new THREE.MeshStandardMaterial({
      color: 0x0a0c10,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0,
    })
    const ledRingMat = new THREE.MeshBasicMaterial({
      color: 0x5dcaa5,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
    })

    const camBodyGeo = new THREE.BoxGeometry(0.55, 0.34, 0.38)
    const camBody = new THREE.Mesh(camBodyGeo, camBodyMat)
    visionCameraGroup.add(camBody)

    const railGeo = new THREE.BoxGeometry(0.55, 0.04, 0.04)
    const railOffsets: [number, number][] = [
      [0.19, 0.21],
      [0.19, -0.21],
      [-0.19, 0.21],
      [-0.19, -0.21],
    ]
    railOffsets.forEach(([y, z]) => {
      const rail = new THREE.Mesh(railGeo, camTrimMat)
      rail.position.set(0, y, z)
      visionCameraGroup.add(rail)
    })

    const lensHousingGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.16, 24)
    const lensHousing = new THREE.Mesh(lensHousingGeo, camTrimMat)
    lensHousing.rotation.z = Math.PI / 2
    lensHousing.position.set(0.32, 0, 0)
    visionCameraGroup.add(lensHousing)

    const lensGlassGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.025, 24)
    const lensGlass = new THREE.Mesh(lensGlassGeo, lensGlassMat)
    lensGlass.rotation.z = Math.PI / 2
    lensGlass.position.set(0.42, 0, 0)
    visionCameraGroup.add(lensGlass)

    const ledRingGeo = new THREE.TorusGeometry(0.135, 0.018, 12, 32)
    const ledRing = new THREE.Mesh(ledRingGeo, ledRingMat)
    ledRing.rotation.y = Math.PI / 2
    ledRing.position.set(0.41, 0, 0)
    visionCameraGroup.add(ledRing)

    const mountStubGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.22, 12)
    const mountStub = new THREE.Mesh(mountStubGeo, camTrimMat)
    mountStub.position.set(0, 0.28, 0)
    visionCameraGroup.add(mountStub)

    visionCameraGroup.position.set(-3.5, 1.2, 1.5)
    visionCameraGroup.lookAt(0, 0.2, halfD)
    scene.add(visionCameraGroup)

    // ─── Helpers (closures over the scene objects above) ──────────────
    const setCamOpacity = (o: number) => {
      camBodyMat.opacity = o
      camTrimMat.opacity = o
      lensGlassMat.opacity = o
      ledRingMat.opacity = o * 0.9
    }

    const updateVisionCamera = (now: number) => {
      if (camEntryStartRef.current >= 0) {
        const t = Math.min(1, (now - camEntryStartRef.current) / CAM_ENTRY_DUR)
        const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic
        setCamOpacity(eased)
        visionCameraGroup.position.x = -4.5 + 1.0 * eased
        if (t >= 1) camEntryStartRef.current = -1
      }
      if (camExitStartRef.current >= 0) {
        const t = Math.min(1, (now - camExitStartRef.current) / CAM_EXIT_DUR)
        const eased = t * t // ease-in quadratic
        setCamOpacity(1 - eased)
        visionCameraGroup.position.x = -3.5 - 1.0 * eased
        if (t >= 1) {
          camExitStartRef.current = -1
          visionCameraGroup.visible = false
          setCamOpacity(0)
          visionCameraGroup.position.x = -4.5
        }
      }
    }

    const updateScanCells = (now: number) => {
      for (const cell of scanCells) {
        if (cell.fadeStart < 0) continue
        const t = now - cell.fadeStart
        if (t < 0) continue
        let o: number
        if (t < CELL_RAMP) {
          o = 0.7 * (t / CELL_RAMP)
        } else if (t < CELL_RAMP + CELL_HOLD) {
          o = 0.7
        } else if (t < CELL_FULL) {
          const fadeT = (t - CELL_RAMP - CELL_HOLD) / CELL_FADE
          o = 0.7 * (1 - fadeT)
        } else {
          o = 0
          cell.fadeStart = -1
        }
        cell.mat.opacity = o
      }
    }

    // Project a worldPos onto screen pixels and position the hotspot
    // button. Hide if the face is back-facing.
    const _v = new THREE.Vector3()
    const _n = new THREE.Vector3()
    const _toCam = new THREE.Vector3()
    const projectHotspots = () => {
      const rect = wrapper.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      for (const z of ZONES) {
        const btn = hotspotsRef.current.get(z.id)
        if (!btn) continue
        _v.set(z.worldPos[0], z.worldPos[1], z.worldPos[2])
        _v.applyMatrix4(containerGroup.matrixWorld)
        _n.set(
          z.face === '+x' ? 1 : z.face === '-x' ? -1 : 0,
          z.face === '+y' ? 1 : z.face === '-y' ? -1 : 0,
          z.face === '+z' ? 1 : z.face === '-z' ? -1 : 0,
        )
        _n.transformDirection(containerGroup.matrixWorld)
        _toCam.subVectors(camera.position, _v).normalize()
        const dot = _n.dot(_toCam)
        if (dot < 0.05) {
          btn.style.opacity = '0'
          btn.style.pointerEvents = 'none'
          continue
        }
        // Restore opacity to whatever the discovered-zone CSS dictates.
        btn.style.opacity = ''
        btn.style.pointerEvents = 'auto'
        _v.project(camera)
        btn.style.left = ((_v.x + 1) / 2) * rect.width + 'px'
        btn.style.top = (1 - (_v.y + 1) / 2) * rect.height + 'px'
      }
    }

    // Reset everything (called at the start of each scan).
    const resetState = () => {
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
      isScanningRef.current = false
      for (const cell of scanCells) {
        cell.mat.opacity = 0
        cell.fadeStart = -1
      }
      camEntryStartRef.current = -1
      camExitStartRef.current = -1
      visionCameraGroup.visible = false
      setCamOpacity(0)
      visionCameraGroup.position.x = -4.5
      setSummaryVisible(false)
      setHelperVisible(false)
      setReplayVisible(false)
      setDiscoveredZones(new Set())
      setSummaryRowsVisible(new Set())
      setActiveZoneId(null)
    }

    const runScanSequence = () => {
      resetState()
      isScanningRef.current = true

      // Camera entry at t=0.
      visionCameraGroup.visible = true
      camEntryStartRef.current = performance.now()

      const sweepStartDelay = CAM_ENTRY_DUR + CAM_SETTLE // 1000ms

      timeoutsRef.current.push(
        setTimeout(() => {
          const sweepStart = performance.now()
          for (const cell of scanCells) {
            cell.fadeStart = sweepStart + cell.col * CELL_STAGGER
          }
          const sweepDuration = (COLS - 1) * CELL_STAGGER + CELL_FULL // 1552ms

          // Camera exit when sweep ends.
          timeoutsRef.current.push(
            setTimeout(() => {
              camExitStartRef.current = performance.now()
              isScanningRef.current = false
            }, sweepDuration),
          )

          // Summary card 100ms after sweep ends — header reveals, then
          // severity rows stagger in 100ms apart starting 200ms after the
          // header. Under prefers-reduced-motion, all rows reveal with the
          // header (no stagger).
          timeoutsRef.current.push(
            setTimeout(() => {
              setSummaryVisible(true)
              if (prefersReducedMotionRef.current) {
                setSummaryRowsVisible(new Set(ZONES.map((z) => z.id)))
              } else {
                ZONES.forEach((z, i) => {
                  timeoutsRef.current.push(
                    setTimeout(
                      () => {
                        setSummaryRowsVisible((prev) => {
                          const next = new Set(prev)
                          next.add(z.id)
                          return next
                        })
                      },
                      200 + i * 100,
                    ),
                  )
                })
              }
            }, sweepDuration + 100),
          )

          // Hotspot reveal — 700ms beat after sweep ends, then 200ms stagger.
          timeoutsRef.current.push(
            setTimeout(() => {
              ZONES.forEach((z, i) => {
                timeoutsRef.current.push(
                  setTimeout(() => {
                    setDiscoveredZones((prev) => {
                      const next = new Set(prev)
                      next.add(z.id)
                      return next
                    })
                  }, i * 200),
                )
              })
            }, sweepDuration + 700),
          )

          // Helper + replay button — after the last hotspot + a 200ms beat.
          timeoutsRef.current.push(
            setTimeout(
              () => {
                setHelperVisible(true)
                setReplayVisible(true)
              },
              sweepDuration + 700 + (ZONES.length - 1) * 200 + 200,
            ),
          )
        }, sweepStartDelay),
      )
    }

    // Expose runScanSequence for the React replay-button handler.
    runScanSequenceRef.current = runScanSequence

    // ─── Animation loop ───────────────────────────────────────────────
    let rafId = 0
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const now = performance.now()
      const idle = now - lastInteractionRef.current > 1800
      if (
        idle &&
        !isScanningRef.current &&
        !isHoveringRef.current &&
        activeZoneIdRef.current === null
      ) {
        containerGroup.rotation.y += 0.0035
      }
      updateScanCells(now)
      updateVisionCamera(now)
      projectHotspots()
      renderer.render(scene, camera)
    }
    animate()

    // ─── Interaction listeners ────────────────────────────────────────
    const onEnter = () => {
      isHoveringRef.current = true
      lastInteractionRef.current = performance.now()
    }
    const onLeave = () => {
      isHoveringRef.current = false
      lastInteractionRef.current = performance.now()
    }
    const onMove = () => {
      lastInteractionRef.current = performance.now()
    }
    wrapper.addEventListener('mouseenter', onEnter)
    wrapper.addEventListener('mouseleave', onLeave)
    wrapper.addEventListener('mousemove', onMove)

    // ─── IntersectionObserver — replay on entry, debounced ────────────
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.intersectionRatio >= 0.4 && !wasVisibleRef.current) {
            wasVisibleRef.current = true
            runScanSequence()
          } else if (e.intersectionRatio < 0.1) {
            wasVisibleRef.current = false
          }
        })
      },
      { threshold: [0, 0.1, 0.4] },
    )
    io.observe(wrapper)

    // ─── Cleanup ──────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafId)
      timeoutsRef.current.forEach(clearTimeout)
      timeoutsRef.current = []
      window.removeEventListener('resize', resize)
      wrapper.removeEventListener('mouseenter', onEnter)
      wrapper.removeEventListener('mouseleave', onLeave)
      wrapper.removeEventListener('mousemove', onMove)
      io.disconnect()

      // Dispose geometries.
      ;[
        bodyGeo,
        ribGeo,
        doorGeo,
        handleGeo,
        cellGeo,
        camBodyGeo,
        railGeo,
        lensHousingGeo,
        lensGlassGeo,
        ledRingGeo,
        mountStubGeo,
      ].forEach((g) => g.dispose())

      // Dispose materials.
      ;[
        bodyMat,
        corrugationMat,
        doorMat,
        handleMat,
        camBodyMat,
        camTrimMat,
        lensGlassMat,
        ledRingMat,
      ].forEach((m) => m.dispose())
      for (const cell of scanCells) cell.mat.dispose()

      renderer.dispose()
      renderer.forceContextLoss()
    }
  }, [])

  const handleReplay = () => {
    runScanSequenceRef.current?.()
  }

  const activeZone = activeZoneId ? ZONES.find((z) => z.id === activeZoneId) ?? null : null
  const activePhoto = activeZone ? IMAGES[activeZone.id] : ''

  return (
    <div
      ref={wrapperRef}
      className="relative w-full h-[520px] sm:h-[620px] mt-8 rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      style={{ background: '#0a0c10' }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Scan summary card — top-left, persists through the walkthrough as a
          severity-keyed index. Rows are interactive: clicking opens the same
          inspection card the hotspot does and highlights the active row. */}
      <div
        className={`absolute top-4 left-4 max-w-[calc(100%-32px)] sm:max-w-xs rounded-2xl pointer-events-none transition-[opacity,transform] duration-[360ms] ease-out ${
          summaryVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
        style={{
          background: 'rgba(93, 202, 165, 0.12)',
          border: '1px solid #5DCAA5',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
        role="status"
      >
        <div
          className="flex items-center gap-2 px-5 py-3 text-[13px] font-semibold tracking-wide"
          style={{ color: '#5DCAA5' }}
        >
          <Radar size={16} aria-hidden />
          <span>Scan complete — 3 findings</span>
        </div>
        <div className="border-t border-[#5DCAA5]/20 p-1.5 pointer-events-auto">
          {ZONES.map((zone) => {
            const visible = summaryRowsVisible.has(zone.id)
            const active = activeZoneId === zone.id
            const sev = SEVERITY_STYLES[zone.severity]
            const displayTitle = zone.title.replace(/\s*—\s*(major|moderate|minor)\s*$/i, '')
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => setActiveZoneId(zone.id)}
                className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-left transition-[opacity,transform,background-color] duration-[280ms] ease-out hover:bg-white/[0.06] ${
                  visible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-2 pointer-events-none'
                } ${active ? 'bg-white/[0.04]' : ''}`}
              >
                <span
                  aria-hidden
                  className="inline-block w-2 h-2 rounded-full shrink-0"
                  style={{ background: sev.ink }}
                />
                <span
                  className="uppercase text-[11px] tracking-wider shrink-0 font-semibold"
                  style={{ color: sev.ink }}
                >
                  {zone.severity}
                </span>
                <span className="text-[14px] text-white flex-1 min-w-0 truncate font-normal">
                  {displayTitle}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Replay button — top-right */}
      <button
        type="button"
        onClick={handleReplay}
        className={`absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-[#e8eaed] transition-[opacity,background-color] duration-200 ease-out hover:bg-white/15 ${
          replayVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
        aria-label="Replay scan"
      >
        <RefreshCw size={14} aria-hidden />
        <span>Replay scan</span>
      </button>

      {/* Helper text — bottom center */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-3.5 py-2 rounded-full text-xs pointer-events-none transition-[opacity,transform] duration-[320ms] ease-out ${
          helperVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2.5'
        }`}
        style={{
          background: 'rgba(0,0,0,0.6)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: '#9aa0a6',
        }}
      >
        Tap any marker to inspect
      </div>

      {/* Inspection card — slides in from right on desktop, up from bottom on mobile */}
      <div
        className={`absolute z-10 overflow-y-auto sm:top-4 sm:right-4 sm:left-auto sm:bottom-auto sm:w-[320px] sm:max-h-[calc(100%-32px)] sm:rounded-xl bottom-0 left-0 right-0 w-full max-h-[75%] rounded-t-xl transition-transform duration-[320ms] ${
          activeZoneId
            ? 'sm:translate-x-0 sm:translate-y-0 translate-y-0'
            : 'sm:translate-x-[calc(100%+24px)] sm:translate-y-0 translate-y-full'
        }`}
        style={{
          background: '#11141a',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: 18,
          transitionTimingFunction: 'cubic-bezier(0.32, 0.72, 0, 1)',
        }}
        aria-hidden={!activeZoneId}
      >
        <button
          type="button"
          onClick={() => setActiveZoneId(null)}
          className="absolute top-3 right-3 w-7 h-7 rounded-md flex items-center justify-center text-[#9aa0a6] hover:bg-white/10 hover:text-[#e8eaed] transition-colors"
          style={{ background: 'rgba(255,255,255,0.06)', border: 'none' }}
          aria-label="Close inspection card"
        >
          <X size={16} aria-hidden />
        </button>

        {activeZone && (
          <>
            {/* Photo / fallback */}
            <div
              className="w-full aspect-[4/3] rounded-lg flex flex-col items-center justify-center gap-1.5 mb-3.5"
              style={
                activePhoto
                  ? {
                      backgroundImage: `url('${activePhoto}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }
                  : {
                      background:
                        'linear-gradient(135deg, rgba(93,202,165,0.08), rgba(93,202,165,0.02))',
                      border: '1px solid rgba(93,202,165,0.12)',
                    }
              }
              aria-hidden={!!activePhoto}
            >
              {!activePhoto && (
                <>
                  <Camera size={32} className="opacity-50" style={{ color: '#3a8f72' }} aria-hidden />
                  <span
                    className="text-[11px] uppercase tracking-[0.06em] opacity-60"
                    style={{ color: '#3a8f72' }}
                  >
                    Inspection photo
                  </span>
                </>
              )}
            </div>

            <div
              className="text-[11px] uppercase tracking-[0.08em] mb-1.5"
              style={{ color: '#5DCAA5' }}
            >
              {activeZone.label}
            </div>
            <h3 className="text-base font-semibold leading-snug mb-3" style={{ color: '#e8eaed' }}>
              {activeZone.title}
            </h3>

            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold mb-3"
              style={{
                background: SEVERITY_STYLES[activeZone.severity].bg,
                color: SEVERITY_STYLES[activeZone.severity].ink,
              }}
            >
              <span
                aria-hidden
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: SEVERITY_STYLES[activeZone.severity].ink }}
              />
              {activeZone.severityLabel}
            </span>

            <div className="flex flex-wrap gap-1.5 mb-3">
              {activeZone.codes.map((c) => (
                <span
                  key={c}
                  className="px-2 py-1 rounded-md text-[11px] font-mono"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: '#e8eaed',
                  }}
                >
                  {c}
                </span>
              ))}
            </div>

            <p className="text-[13px] leading-relaxed m-0" style={{ color: '#9aa0a6' }}>
              {activeZone.caption}
            </p>
          </>
        )}
      </div>

      {/* Hotspots — DOM-positioned each frame by projectHotspots(); React
          owns the reveal state and the click handler. Active hotspot scales
          up slightly + gets a bolder ring for the row-→-hotspot highlight. */}
      {ZONES.map((z, i) => {
        const revealed = discoveredZones.has(z.id)
        const active = activeZoneId === z.id
        return (
          <button
            key={z.id}
            ref={(el) => {
              if (el) hotspotsRef.current.set(z.id, el)
              else hotspotsRef.current.delete(z.id)
            }}
            type="button"
            onClick={() => setActiveZoneId(z.id)}
            className={`absolute z-[5] w-8 h-8 max-sm:w-[38px] max-sm:h-[38px] rounded-full flex items-center justify-center font-bold text-[13px] max-sm:text-sm cursor-pointer transition-[transform,opacity,box-shadow] duration-[280ms] ${
              revealed
                ? `opacity-100 -translate-x-1/2 -translate-y-1/2 ${active ? 'scale-[1.15]' : 'scale-100'}`
                : 'opacity-0 -translate-x-1/2 -translate-y-1/2 scale-0 pointer-events-none'
            }`}
            style={{
              background: '#5DCAA5',
              color: '#062018',
              border: 'none',
              boxShadow: active
                ? '0 0 0 6px rgba(93, 202, 165, 0.45), 0 0 24px rgba(93, 202, 165, 0.4)'
                : '0 0 0 4px rgba(93, 202, 165, 0.2)',
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
            aria-label={`View ${z.title}`}
          >
            {i + 1}
            {revealed && (
              <span
                aria-hidden
                className="absolute rounded-full pointer-events-none"
                style={{
                  inset: -8,
                  border: '2px solid #5DCAA5',
                  animation: 'hotspot-pulse 2.2s ease-in-out infinite',
                }}
              />
            )}
          </button>
        )
      })}
    </div>
  )
}

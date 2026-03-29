import React, { useState, useEffect, useRef } from 'react';
import { colors, fonts } from '../../content/brand';
import { dataFeedConfig } from '../../content/hero';

const statusColors = {
  'GATE IN': colors.green,
  'GATE OUT': colors.coral,
  'VALIDATED': colors.yellow,
  'SCANNED': colors.blue,
};

const statusBgColors = {
  'GATE IN': 'rgba(34, 197, 94, 0.15)',
  'GATE OUT': 'rgba(255, 127, 110, 0.15)',
  'VALIDATED': 'rgba(251, 191, 36, 0.15)',
  'SCANNED': 'rgba(91, 127, 255, 0.15)',
};

const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const makeTimestamp = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

const createEntry = (id) => ({
  id,
  code: randomItem(dataFeedConfig.containerCodes),
  type: randomItem(dataFeedConfig.containerTypes),
  status: randomItem(dataFeedConfig.statuses),
  time: makeTimestamp(),
  opacity: 1,
});

const DataStream = () => {
  const [entries, setEntries] = useState([]);
  const entryIdRef = useRef(0);

  useEffect(() => {
    // Seed initial entry
    const initial = createEntry(entryIdRef.current++);
    setEntries([initial]);

    const interval = setInterval(() => {
      setEntries((prev) => {
        const newEntry = createEntry(entryIdRef.current++);
        const updated = [newEntry, ...prev].slice(0, dataFeedConfig.maxVisible);
        // Fade out the last item
        return updated.map((entry, i) => ({
          ...entry,
          opacity: i === updated.length - 1 && updated.length >= dataFeedConfig.maxVisible ? 0.3 : 1,
        }));
      });
    }, dataFeedConfig.intervalMs);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        background: 'rgba(17, 24, 39, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '0 0 20px 20px',
        padding: '14px 18px 16px',
        fontFamily: fonts.mono,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{ fontSize: '9px', fontWeight: 700, color: colors.blue, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
          LIVE FEED
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: colors.green,
              boxShadow: `0 0 6px ${colors.green}`,
              display: 'inline-block',
              animation: 'pulse-dot 2s ease-in-out infinite',
            }}
          />
          <span style={{ fontSize: '8px', fontWeight: 600, color: colors.green, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            ACTIVE
          </span>
        </div>
      </div>

      {/* Entries */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {entries.map((entry, i) => (
          <div
            key={entry.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 8px',
              borderRadius: '6px',
              background: i === 0 ? 'rgba(91, 127, 255, 0.08)' : 'transparent',
              opacity: entry.opacity,
              transition: 'opacity 0.6s ease, background 0.3s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>
                {entry.code}
              </span>
              <span style={{ fontSize: '9px', color: colors.gray500, whiteSpace: 'nowrap' }}>
                {entry.type}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '7px',
                  fontWeight: 700,
                  color: statusColors[entry.status] || colors.blue,
                  background: statusBgColors[entry.status] || 'rgba(91,127,255,0.15)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  letterSpacing: '0.06em',
                  whiteSpace: 'nowrap',
                }}
              >
                {entry.status}
              </span>
              <span style={{ fontSize: '8px', color: colors.gray500, whiteSpace: 'nowrap' }}>
                {entry.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Keyframe for pulsing dot */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

export default DataStream;

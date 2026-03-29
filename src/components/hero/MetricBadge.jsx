import React, { useState, useEffect } from 'react';
import { colors, shadows, fonts } from '../../content/brand';
import { heroBadges } from '../../content/hero';

const badgeColorMap = {
  blue: { bg: colors.blueLight, icon: colors.blue },
  coral: { bg: colors.coralLight, icon: colors.coral },
  green: { bg: colors.greenLight, icon: colors.green },
  orange: { bg: colors.orangeLight, icon: colors.orange },
};

const MetricBadge = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {heroBadges.map((badge, i) => {
        const palette = badgeColorMap[badge.color] || badgeColorMap.blue;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              ...badge.position,
              zIndex: 30,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '14px',
              padding: '14px 18px',
              boxShadow: shadows.lg,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.6s ease ${badge.delay}ms, transform 0.6s ease ${badge.delay}ms`,
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: palette.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                flexShrink: 0,
              }}
            >
              {badge.icon}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
              <span style={{ fontFamily: fonts.heading, fontSize: '14px', fontWeight: 700, color: colors.gray900, lineHeight: 1.2 }}>
                {badge.value}
              </span>
              <span style={{ fontFamily: fonts.heading, fontSize: '10px', fontWeight: 500, color: colors.gray500, letterSpacing: '0.02em' }}>
                {badge.label}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MetricBadge;

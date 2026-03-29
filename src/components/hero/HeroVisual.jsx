import React from 'react';
import { colors } from '../../content/brand';
import ScanLineCanvas from './ScanLineCanvas';
import Container3D from './Container3D';
import DataStream from './DataStream';
import MetricBadge from './MetricBadge';

const HeroVisual = () => {
  return (
    <div
      className="hidden lg:block"
      style={{
        position: 'relative',
        width: '100%',
        height: '520px',
        borderRadius: '20px',
        background: `linear-gradient(180deg, ${colors.gray50}, ${colors.gray100})`,
        border: `1px solid ${colors.gray200}`,
        overflow: 'visible', // allow badges to overflow
      }}
    >
      {/* Inner clipping for canvas & data stream */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '20px',
          overflow: 'hidden',
        }}
      >
        <ScanLineCanvas />
        <DataStream />
      </div>

      {/* 3D Container (centered, within the visual) */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: '100px', // offset for data stream at bottom
          pointerEvents: 'auto',
        }}
      >
        <Container3D />
      </div>

      {/* Floating metric badges */}
      <MetricBadge />
    </div>
  );
};

export default HeroVisual;

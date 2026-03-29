import React from 'react';

const StatCounter = ({ value, prefix, suffix, display, label, color }) => {
  const colorStyles = {
    blue: "text-brand-blue",
    coral: "text-brand-coral",
    orange: "text-brand-orange",
    green: "text-brand-green",
  };

  return (
    <div className="flex flex-col border-l-2 border-brand-blue/10 pl-4 py-1">
      <div className={`text-3xl md:text-3xl font-bold tracking-tight mb-1 ${colorStyles[color] || "text-gray-900"}`}>
        {prefix}{display || value}{suffix}
      </div>
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</div>
    </div>
  );
};

export default StatCounter;

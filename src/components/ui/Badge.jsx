import React from 'react';

const Badge = ({ children, icon, color = "green", className = "" }) => {
  const colorStyles = {
    green: "bg-emerald-50 text-emerald-800 border-emerald-200",
    coral: "bg-brand-coral-light text-brand-coral border-brand-coral/20",
    blue: "bg-brand-blue-light text-brand-blue-dark border-brand-blue/20",
  };

  const defaultStyle = "bg-gray-100 text-gray-800 border-gray-200";
  const activeStyle = colorStyles[color] || defaultStyle;

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${activeStyle} shadow-sm ${className}`}>
      {icon === 'dot-green' && <span className="w-2 h-2 mr-2 bg-brand-nvidia rounded-full animate-pulse" />}
      {icon && icon !== 'dot-green' && <span className="mr-1.5">{icon}</span>}
      {children}
    </span>
  );
};

export default Badge;

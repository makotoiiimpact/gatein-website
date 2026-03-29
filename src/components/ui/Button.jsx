import React from 'react';

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  const baseStyle = "inline-flex items-center justify-center font-bold px-6 py-3 rounded-lg transition-all duration-200";
  const variants = {
    primary: "bg-brand-blue text-white hover:bg-brand-blue-dark hover:-translate-y-0.5 shadow-md hover:shadow-brand-blue/50",
    secondary: "bg-transparent text-gray-800 hover:text-brand-blue hover:bg-gray-50",
    nav: "bg-brand-blue text-white px-5 py-2.5 rounded-lg hover:bg-brand-blue-dark shadow-sm text-sm"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;

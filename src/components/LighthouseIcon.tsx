import React from 'react';

interface LighthouseIconProps {
  className?: string;
}

const LighthouseIcon: React.FC<LighthouseIconProps> = ({ className = "h-12 w-12" }) => {
  return (
    <img 
      src="/lhmy-logo.jpg" 
      alt="등대 말레이시아 로고" 
      className={`${className} object-cover rounded-lg aspect-square`}
    />
  );
};

export default LighthouseIcon;
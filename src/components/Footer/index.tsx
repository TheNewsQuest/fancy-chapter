import React from 'react';
import colors from '../../styles/colors.module.scss';

const Footer: React.FC = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: colors['gray300'],
          height: '57px',
        }}
      >
        <span
          style={{
            color: '#fff',
          }}
        >
          #Footer
        </span>
      </div>
    </>
  );
};

export default Footer;

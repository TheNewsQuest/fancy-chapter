import React from 'react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <>
      <div className={styles['footer-container']}>© 2022 TheNewsQuest</div>
    </>
  );
};

export default Footer;

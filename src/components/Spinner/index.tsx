import { Spin } from 'antd';
import React from 'react';
import styles from './Spinner.module.scss';

const Spinner: React.FC<{}> = () => {
  return <Spin className={styles['spinner']} />;
};

export default Spinner;

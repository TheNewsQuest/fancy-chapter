import React from 'react';
import styles from './Hello.module.scss';

interface HelloProps {
  name: string;
}

const Hello: React.FC<HelloProps> = ({ name }) => (
  <>
    <h1 className={styles['header-blue']}>Hello {name}</h1>
  </>
);

export default Hello;

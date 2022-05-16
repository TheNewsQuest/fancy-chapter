import React from 'react';
import useAppStore from '../../store/store';
import styles from './Counter.module.scss';

interface CounterProps {
  count?: number;
}

const Counter: React.FC<CounterProps> = () => {
  const { count, increment, decrement } = useAppStore((state) => state);
  return (
    <>
      <h2>Current count: {count}</h2>
      <button className={styles['move-right']} onClick={increment}>
        +
      </button>
      <button className={styles['move-right']} onClick={decrement}>
        -
      </button>
    </>
  );
};

export default Counter;

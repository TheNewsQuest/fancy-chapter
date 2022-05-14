import React from 'react';
import useCounterStore from '../../stores/counter';
import styles from './Counter.module.scss';

interface CounterProps {}

const Counter: React.FC<CounterProps> = () => {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  return (
    <>
      <div>
        <div className={styles['counter-text']}>Current count is: {count}</div>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
    </>
  );
};

export default Counter;
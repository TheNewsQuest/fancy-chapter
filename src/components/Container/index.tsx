import clsx from 'clsx';
import React from 'react';
import styles from './Container.module.scss';

interface ContainerProps {
  className?: string;
  children?: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  const classNames = clsx({
    [styles.container]: true,
    [`${className}`]: className,
  });
  return (
    <>
      <div className={classNames}>{children}</div>
    </>
  );
};

export default Container;

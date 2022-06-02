import clsx from 'clsx';
import React, { MouseEventHandler, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  const [click, setClick] = useState(false);

  const handleClick: MouseEventHandler<HTMLAnchorElement | HTMLDivElement> =
    () => setClick(!click);
  const close = () => setClick(false);

  return (
    <>
      <div
        className={click ? styles['main-container'] : ''}
        onClick={() => close()}
      />
      <nav className={styles['navbar']} onClick={(e) => e.stopPropagation()}>
        <div className={styles['nav-container']}>
          <NavLink to="/" className={styles['nav-logo']}>
            <div className={styles['nav-logo-text']}>TheNewsQuest</div>
          </NavLink>
          <ul
            className={
              click
                ? clsx(styles['nav-menu'], styles['active'])
                : styles['nav-menu']
            }
          >
            <li className={styles['nav-item']}>
              <NavLink
                to="/"
                className={(navData) =>
                  navData.isActive
                    ? clsx(styles['nav-links'], styles['active'])
                    : styles['nav-links']
                }
                onClick={click ? handleClick : undefined}
              >
                Home
              </NavLink>
            </li>
            <li className={styles['nav-item']}>
              <NavLink
                to="/insight"
                className={(navData) =>
                  navData.isActive
                    ? clsx(styles['active'], styles['nav-links'])
                    : styles['nav-links']
                }
                onClick={click ? handleClick : undefined}
              >
                Insight
              </NavLink>
            </li>
          </ul>
          <div className={styles['nav-icon']} onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;

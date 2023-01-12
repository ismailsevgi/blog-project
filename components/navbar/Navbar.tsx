import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import useWindowSize from '../../utils/useWindowSize';
import styles from './Navbar.module.scss';

function Navbar() {
  const [navbarHeightState, setNavbarHeightState] = useState<Boolean>(false);
  const parentRef = React.useRef<HTMLDivElement>(null);
  const currentSize = useWindowSize();
  console.log('currentSize: ', currentSize);

  if (currentSize[0] > 1024) {
    if (parentRef?.current && navbarHeightState) {
      setNavbarHeightState(false);
      parentRef?.current!.animate([{ height: '14rem' }, { height: '5rem' }], {
        duration: 300,
        easing: 'ease-in-out',
        fill: 'forwards',
      });
    }
  }

  //this function is for opening and closing navbar
  function openNavbar() {
    if (parentRef?.current && !navbarHeightState) {
      console.log('1');
      setNavbarHeightState(true);

      parentRef?.current.animate([{ height: '5rem' }, { height: '14rem' }], {
        duration: 300,
        easing: 'ease-in-out',
        fill: 'forwards',
      });
    } else if (parentRef?.current && navbarHeightState) {
      setNavbarHeightState(false);
      parentRef?.current!.animate([{ height: '14rem' }, { height: '5rem' }], {
        duration: 300,
        easing: 'ease-in-out',
        fill: 'forwards',
      });
    }
  }

  return (
    <div
      ref={parentRef}
      className='max-w-screen-xl m-auto relative lg:h-[100px]'
    >
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <Link href={'/'}>Akademik Örgücü</Link>
          <span>.</span>
        </div>
        <div className={styles.navigation}>
          <ul className={styles.list}>
            <li>
              <Link href={'/'}>Ana Sayfa</Link>
            </li>
            <li>
              <Link href={'/'}>Örgü</Link>
            </li>
            <li>
              <Link href={'/'}>Kültür</Link>
            </li>
            <li>
              <Link href={'/'}>Gündelik</Link>
            </li>
          </ul>
        </div>
        <div
          onClick={openNavbar}
          className='h-12 bg-white w-12 mr-6 flex lg:hidden justify-center items-center'
        >
          <i className='text-2xl text-black fa-solid fa-bars '></i>
        </div>
      </div>
      <div className='h-36 lg:hidden bottom-0 z-[-1] ease-out duration-1000 absolute opacity-1  bg-black mx-auto w-full lg:w-3/4'>
        <ul className='h-full flex flex-col justify-center items-start pl-4 text-white '>
          <li>
            <Link href={'/'}>Ana Sayfa</Link>
          </li>
          <li>
            <Link href={'/'}>Örgü</Link>
          </li>
          <li>
            <Link href={'/'}>Kültür</Link>
          </li>
          <li>
            <Link href={'/'}>Gündelik</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;

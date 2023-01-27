import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import useWindowSize from '../../utils/useWindowSize';
import styles from './Navbar.module.scss';

function Navbar() {
  const [navbarHeightState, setNavbarHeightState] = useState<Boolean>(false);
  const parentRef = React.useRef<HTMLDivElement>(null);
  const childRef = React.useRef<HTMLDivElement>(null);
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
      setNavbarHeightState(true);

      parentRef?.current.animate([{ height: '5rem' }, { height: '14rem' }], {
        duration: 300,
        easing: 'ease-in-out',
        fill: 'forwards',
      });

      setTimeout(() => {
        childRef?.current?.classList.remove('z-[-1]');
      }, 500);
    } else if (parentRef?.current && navbarHeightState) {
      setNavbarHeightState(false);
      parentRef?.current!.animate([{ height: '14rem' }, { height: '5rem' }], {
        duration: 300,
        easing: 'ease-in-out',
        fill: 'forwards',
      });

      childRef?.current?.classList.add('z-[-1]');
    }
  }

  return (
    <div
      ref={parentRef}
      className='max-w-screen-xl m-auto relative lg:h-[100px]'
    >
      <div className={styles.navbar}>
        <header className={styles.logo}>
          <Link href={'/'}>Akademik Örgücü</Link>
          <span>.</span>
        </header>
        <nav className={styles.navigation}>
          <ul className={styles.list}>
            <li>
              <Link href={'/'}>Ana Sayfa</Link>
            </li>
            <li>
              <Link href={'/'} as={'/?category=orgu'}>
                Örgü
              </Link>
            </li>
            <li>
              <Link href={'/'} as={'/?category=kultur'}>
                Kültür
              </Link>
            </li>
            <li>
              <Link href={'/'} as={'/?category=gundelik'}>
                Gündelik
              </Link>
            </li>
          </ul>
        </nav>
        <div
          onClick={openNavbar}
          className='h-12 bg-white w-12 mr-6 flex lg:hidden justify-center items-center'
        >
          <i className='text-2xl text-black fa-solid fa-bars '></i>
        </div>
      </div>
      <nav
        ref={childRef}
        className='h-36 lg:hidden bottom-0 z-[-1] ease-out duration-1000 absolute opacity-1  bg-black mx-auto w-full lg:w-3/4'
      >
        <ul className='h-full flex flex-col justify-center items-start pl-4 text-white '>
          <li>
            <Link href={'/'}>Ana Sayfa</Link>
          </li>
          <li>
            <Link href={'/'} as={'/?category=orgu'}>
              Örgü
            </Link>
          </li>
          <li>
            <Link href={'/'} as={'/?category=kultur'}>
              Kültür
            </Link>
          </li>
          <li>
            <Link href={'/'} as={'/?category=gundelik'}>
              Gündelik
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;

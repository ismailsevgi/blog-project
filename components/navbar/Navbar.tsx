import Link from 'next/link';
import React, { useRef } from 'react';
import styles from './Navbar.module.scss';

function Navbar() {
  const navbarRef = React.useRef<HTMLDivElement>(null);

  function openNavbar() {
    //navbar margin bottom transition
    if (navbarRef?.current?.classList.contains('mb-[-9rem]')) {
      navbarRef?.current?.classList.remove('mb-[-9rem]');
    } else {
      navbarRef?.current?.classList.add('mb-[-9rem]');
    }
  }

  return (
    <div
      ref={navbarRef}
      className='max-w-screen-xl m-auto mb-[-9rem] lg:mb-[-9rem] ease-in duration-300'
    >
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <Link href={'/'}>Academik Örgücü</Link>
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
      <div className='h-36 bg-black mx-auto flex w-full lg:w-3/4'>
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

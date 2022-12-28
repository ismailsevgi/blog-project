import Link from 'next/link';
import React from 'react';
import styles from './Navbar.module.scss';

function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link href={'/'}>AcademicDentist</Link>
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
    </div>
  );
}

export default Navbar;

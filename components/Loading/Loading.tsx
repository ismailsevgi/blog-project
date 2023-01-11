import React from 'react';
import styles from './Loading.module.scss';

function Loading() {
  return (
    <div className={styles.Wrapper}>
      <img className={styles.CatGif} src='./catGif.gif' />
    </div>
  );
}

export default Loading;

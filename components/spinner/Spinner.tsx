import React from 'react';
import styles from './Spinner.module.scss';
type Props = {};

const Spinner = (props: Props) => {
  return (
    <div className={styles.Spinner}>
      <div className={styles.bounce1}></div>
      <div className={styles.bounce2}></div>
      <div className={styles.bounce3}></div>
    </div>
  );
};

export default Spinner;

import React, { Component } from 'react'
import styles from './Button.scss';

console.log(styles);
export default function Button(props) {
  return (
    <div className={styles.container}>
      <span>
        {props.children}
      </span>
    </div>
  )
}

import React from 'react';
import styles from './Button.scss';

export default function Button(props) {
  return (
    <div className={styles.container}>
      <span>
        {props.children}
      </span>
    </div>
  );
}

Button.propTypes = {
  children: React.PropTypes.node
};

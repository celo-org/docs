import React from 'react';
import styles from './ImageWrapper.module.css';

type ImageWrapperProps = {
  path: string,
  alt: string,
  width: string
}

export default function PageRef({ path, alt, width } : ImageWrapperProps) {
  return (
      <div className={styles.center}>
        <img src={path} alt={alt} width={width}/>
      </div>
  )
}
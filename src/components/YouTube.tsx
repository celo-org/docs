import React from 'react';
import ReactYouTube from 'react-youtube';
import styles from './YouTube.module.css';

export default function YouTube({ videoId } : { videoId: string }) {
  return (
    <div className={styles.container}>
      <ReactYouTube
        containerClassName={styles.sizer}
        videoId={videoId}
        opts={{
          height: '100%',
          width: '100%',
        }}
      />
    </div>
  )
}

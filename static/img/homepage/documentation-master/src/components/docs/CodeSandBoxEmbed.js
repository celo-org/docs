import React from 'react';

export const CodeSandBoxEmbed = ({ uri, height }) => (
  <iframe
    src={`https://codesandbox.io/embed/${uri}?fontsize=14&hidenavigation=0&theme=dark&view=preview`}
    title={'Code Sandbox'}
    style={{
      width: '100%',
      height: height || 500,
      borderWidth: 2,
      borderRadius: 4,
      borderColor: '#6c69a0',
      overflow: 'hidden',
    }}
    allow={
      'geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media; usb'
    }
    sandbox={
      'allow-modals allow-forms allow-popups allow-scripts allow-same-origin'
    }
  />
);

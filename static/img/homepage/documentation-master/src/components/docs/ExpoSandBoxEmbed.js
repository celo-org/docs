import React from 'react';

export const ExpoSandBoxEmbed = ({ uri, height }) => {
  // https://github.com/expo/snack/blob/main/docs/embedding-snacks.md
  // Script is set in docusaurus.config.js
  return (
    <div
      data-snack-id={uri}
      data-snack-platform={'web'}
      data-snack-preview={'true'}
      data-snack-theme={'dark'}
      data-snack-loading={'lazy'}
      style={{
        width: '100%',
        height: height || 500,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: '#6c69a0',
        overflow: 'hidden',
        backgroundColor: '#26262f',
      }}
    />
  );
};

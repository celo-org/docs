import {
  FiDownload,
  FiEdit,
  FiGitMerge,
  FiRepeat,
  FiServer,
  FiStar,
  FiUsers,
  FiZap,
} from 'react-icons/fi';
import React from 'react';

export const iconKeyMap = {
  star: (props) => <FiStar {...props} />,
  zap: (props) => <FiZap {...props} />,
  repeat: (props) => <FiRepeat {...props} />,
  users: (props) => <FiUsers {...props} />,
  server: (props) => <FiServer {...props} />,
  edit: (props) => <FiEdit {...props} />,
  gitMerge: (props) => <FiGitMerge {...props} />,
  download: (props) => <FiDownload {...props} />,
};

import React, { useEffect } from 'react';

import LandingPage from '../_pages/LandingPage';
import core from '../core';

const Home = () => {
  useEffect(() => {
    // Initial fetch Stats
    core.stats.getNPMDownloads();
    core.stats.getGithubStats();
  }, []);

  return <LandingPage />;
};

export default Home;

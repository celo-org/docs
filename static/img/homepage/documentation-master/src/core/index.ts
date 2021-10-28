import ui from './entities/ui';
import stats from './entities/stats';
import { globalBind } from '@agile-ts/core';

const core = {
  ui: ui,
  stats: stats,
};

// For better debugging
globalBind('__core__', core);

export default core;

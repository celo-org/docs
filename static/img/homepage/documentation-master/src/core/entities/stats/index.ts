import * as actions from './stats.actions';
import * as controller from './stats.controller';
import * as routes from './stats.routes';
import * as interfaces from './stats.interface';

export default {
  ...actions,
  ...controller,
  ...routes,
  ...interfaces,
};

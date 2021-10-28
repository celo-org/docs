import { ASTRONAUT_DARK } from './ui.controller';

export const toggleAstronautColor = (dark: boolean): void => {
  ASTRONAUT_DARK.set(dark);
};

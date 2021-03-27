import { combineReducers } from 'redux';

import gameReducer from './gameReducer';
import socketReducer from './socketReducer';
import roomReducer from './roomReducer';
import playerReducer from './playerReducer';

export const rootReducer = combineReducers({
  gameReducer,
  socketReducer,
  roomReducer,
  playerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;


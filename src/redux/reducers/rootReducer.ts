import { combineReducers } from 'redux';

import gameReducer from './gameReducer';
import socketReducer from './socketReducer';

export const rootReducer = combineReducers({
  gameReducer,
  socketReducer
});

export type RootState = ReturnType<typeof rootReducer>;


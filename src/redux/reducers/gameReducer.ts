import { ActionType } from "../types"

export const ACTIONS = {
  SET_ROOM_ID: 'SET_ROOM_ID',
  RESET_ROOM_ID: 'RESET_ROOM_ID',
  SET_USER_ID: 'SET_USER_ID',
  RESET_USER_ID: 'RESET_USER_ID',
  SET_IS_ALIVE: 'SET_IS_ALIVE',
  SET_COUNT: 'SET_COUNT',
}

const initialState = {
  roomId: null,
  userId: null,
  isAlive: false,
  count: 0,
}

const gameReducer = (state = initialState, action: ActionType) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.SET_ROOM_ID:
      state.roomId = payload;
      return state;
    case ACTIONS.RESET_ROOM_ID:
      state.roomId = null;
      return state;
    case ACTIONS.SET_USER_ID:
      state.userId = payload;
      return state;
    case ACTIONS.RESET_USER_ID:
      state.userId = null;
      return state;
    case ACTIONS.SET_IS_ALIVE:
      state.isAlive = payload;
      return state;
    case ACTIONS.SET_COUNT:
      state.count = payload;
      return state;
    default:
      return state;
  }
}

export default gameReducer;

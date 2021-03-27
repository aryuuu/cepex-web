import { ActionType } from "../types"

const initialState = {
  roomId: null,
  userId: null,
  isAlive: false,
  count: 0,
}

export default (state = initialState, action: ActionType) => {
  const { type, payload } = action;

  switch (type) {
    case 'INCREMENT_COUNT':
      state.count++;
      return state;
    case 'DECREMENT_COUNT':
      state.count--;
      return state;
    default:
      return state;
  }
}

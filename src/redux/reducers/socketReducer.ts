import { ActionType } from "../types";

const initialState = {
  socket: null
}

export default (state = initialState, action: ActionType) => {
  const { type, payload } = action;

  switch (type) {
    default:
      return state;
  }
}

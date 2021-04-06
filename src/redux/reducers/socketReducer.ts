import { Socket } from "../../types";
import { ActionType } from "../types";

// const socket = new WebSocket('ws://localhost:3001/ws/');

export const ACTIONS = {
  INIT_SOCKET: 'INIT_SOCKET',
  REMOVE_SOCKET: 'REMOVE_SOCKET'
}

const initialState: Socket = {
  socket: {} as WebSocket
}

// socket.onopen = () => {
//   console.log('connected to websocket server');
// }

// socket.onmessage = (ev) => {
//   console.log(ev.data)
// }

const reducer = (state = initialState, action: ActionType) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.INIT_SOCKET:
      state.socket = new WebSocket(`ws://localhost:3001/game/${payload}`);
      return state;
    default:
      return state;
  }
}

export default reducer;

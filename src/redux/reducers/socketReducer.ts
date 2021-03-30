import { ActionType } from "../types";

const socket = new WebSocket('ws://localhost:3001/ws');

const initialState = {
  socket: socket
}

socket.onopen = () => {
  console.log('connected to websocket server');
}

socket.onmessage = (ev) => {
  console.log(ev.data)
}

export default (state = initialState, action: ActionType) => {
  const { type } = action;

  switch (type) {
    default:
      return state;
  }
}

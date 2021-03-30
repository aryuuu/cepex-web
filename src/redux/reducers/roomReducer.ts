import { ActionType } from "../types"
import { Player, Room } from '../../types';

export const ACTIONS = {
  SET_ID: 'SET_ID',
  RESET_ROOM: 'RESET_ROOM',
  SET_CAPACITY: 'SET_CAPACITY',
  SET_HOST: 'SET_HOST',
  SET_START: 'SET_START',
  SET_STOP: 'SET_STOP',
  RESET_ROTATION: 'RESET_ROTATION',
  SET_REVERSE: 'SET_REVERSE',
  SET_PLAYERS: 'SET_PLAYERS',
  ADD_PLAYER: 'ADD_PLAYER',
  REMOVE_PLAYER: 'REMOVE_PLAYER',
  ADD_COUNT: 'ADD_COUNT',
  RESET_COUNT: 'RESET_COUNT',
}

const initialState: Room = {
  id_room: '',
  capacity: 0,
  id_host: '',
  is_started: false,
  is_clockwise: false,
  players: [],
  deck: [],
  count: 0,
}

export default (state = initialState, action: ActionType) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.SET_ID:
      state.id_room = payload;
      return state;
    case ACTIONS.RESET_ROOM:
      state = initialState;
      return state;
    case ACTIONS.SET_CAPACITY:
      state.capacity = payload;
      return state;
    case ACTIONS.SET_HOST:
      state.id_host = payload;
      return state;
    case ACTIONS.SET_START:
      state.is_started = true;
      return state;
    case ACTIONS.SET_STOP:
      state.is_started = false;
      return state;
    case ACTIONS.RESET_ROTATION:
      state.is_clockwise = false;
      return state;
    case ACTIONS.SET_REVERSE:
      state.is_clockwise = !state.is_clockwise;
      return state;
    case ACTIONS.SET_PLAYERS:
      state.players = payload;
      return state;
    case ACTIONS.ADD_PLAYER:
      state.players.push(payload);
      return state;
    case ACTIONS.REMOVE_PLAYER:
      state.players = state.players.filter(
        (player: Player) => player.id_player !== payload.id_player
      );
      return state;
    case ACTIONS.ADD_COUNT:
      state.count += payload;
      return state;
    case ACTIONS.RESET_COUNT:
      state.count = 0;
      return state;
    default:
      return state;
  }
}

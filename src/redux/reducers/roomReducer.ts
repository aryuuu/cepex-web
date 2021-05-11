import { ActionType } from "../types"
import { Player, Room, Card } from '../../types';

export const ACTIONS = {
  SET_ROOM: 'SET_ROOM',
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
  SET_COUNT: 'SET_COUNT',
  ADD_COUNT: 'ADD_COUNT',
  RESET_COUNT: 'RESET_COUNT',
  SET_TURN: 'SET_TURN',
  SET_LAST_CARD: 'SET_LAST_CARD',
  KILL_PLAYER: 'KILL_PLAYER',
  END_GAME: 'END_GAME',
}

const initialState: Room = {
  id_room: '',
  capacity: 0,
  id_host: '',
  is_started: false,
  is_clockwise: false,
  players: [],
  deck: [],
  idx_player_in_turn: 0,
  count: 0,
  last_card: {} as Card
}

const reducer = (state = initialState, action: ActionType) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.SET_ROOM:
      state.id_room = payload.id_room;
      state.id_host = payload.id_host;
      state.capacity = payload.capacity;
      state.is_clockwise = payload.is_started;
      state.is_started = payload.is_started;
      state.players = payload.players;

      return state;
    case ACTIONS.SET_ID:
      return {
        ...state,
        id_room: payload,
      };
    case ACTIONS.RESET_ROOM:
      return {
        ...initialState
      };
    case ACTIONS.SET_CAPACITY:
      return {
        ...state,
        capacity: payload,
      };
    case ACTIONS.SET_HOST:
      console.log('set host reducer');
      return {
        ...state,
        id_host: payload,
      }
    case ACTIONS.SET_START:
      return {
        ...state,
        is_started: true,
      };
    case ACTIONS.SET_STOP:
      return {
        ...state,
        is_started: false,
      };
    case ACTIONS.RESET_ROTATION:
      return {
        ...state,
        is_clockwise: false,
      };
    case ACTIONS.SET_REVERSE:
      return {
        ...state,
        is_clockwise: !state.is_clockwise
      }
    case ACTIONS.SET_PLAYERS:
      return {
        ...state,
        players: payload,
      };
    case ACTIONS.ADD_PLAYER:
      return {
        ...state,
        players: [...state.players, payload]
      }
    case ACTIONS.REMOVE_PLAYER:
      const newPlayers = state.players.filter(
        (player: Player) => player.id_player !== payload)
      return {
        ...state,
        players: newPlayers
      }
    case ACTIONS.SET_COUNT:
      return {
        ...state,
        count: payload
      };
    case ACTIONS.ADD_COUNT:
      return {
        ...state,
        count: state.count + payload,
      }
    case ACTIONS.RESET_COUNT:
      state.count = 0;
      return state;
    case ACTIONS.SET_TURN:
      return {
        ...state,
        idx_player_in_turn: payload
      }
    case ACTIONS.SET_LAST_CARD:
      return {
        ...state,
        last_card: payload
      }
    case ACTIONS.KILL_PLAYER:
      const temp = state.players.map((p: Player) => {
        if (p.id_player === payload) {
          return ({
            ...p,
            is_alive: false
          })
        }
        return p
      });

      return {
        ...state,
        players: temp
      }
    case ACTIONS.END_GAME:
      return {
        ...state,
        is_started: false,
        count: 0,
        is_clockwise: false,
        // last_card: {} as Card,
        idx_player_in_turn: 0
      }
    default:
      return state;
  }
}

export default reducer;

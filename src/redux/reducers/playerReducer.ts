import { ActionType } from "../types"
import { Player } from '../../types';

export const ACTIONS = {
  RESET_PLAYER: 'RESET_PLAYER',
  SET_NAME: 'SET_NAME',
  SET_ID: 'SET_ID',
  SET_AVATAR: 'SET_AVATAR',
  RESET_AVATAR: 'RESET_AVATAR',
  SET_ALIVE: 'SET_ALIVE',
  SET_DEAD: 'SET_DEAD',
  SET_ADMIN: 'SET_ADMIN',
  RESET_ADMIN: 'RESET_ADMIN',
  SET_HAND: 'SET_HAND',
  RESET_HAND: 'RESET_HAND',
  DISCARD_HAND: 'DISCARD_HAND',
  ADD_HAND: 'ADD_HAND'
}

const initialState: Player = {
  id_player: '',
  avatar_url: '',
  name: '',
  is_alive: false,
  is_admin: false,
  hand: []
}

const reducer = (state = initialState, action: ActionType) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.RESET_PLAYER:
      state = initialState
      return state;
    case ACTIONS.SET_NAME:
      return {
        ...state,
        name: payload
      };
    case ACTIONS.SET_ID:
      return {
        ...state,
        id_player: payload
      }
    case ACTIONS.SET_AVATAR:
      return {
        ...state,
        avatar_url: payload
      };
    case ACTIONS.RESET_AVATAR:
      return {
        ...state,
        avatar_url: ''
      };
    case ACTIONS.SET_ALIVE:
      return {
        ...state,
        is_alive: true
      };
    case ACTIONS.SET_DEAD:
      return {
        ...state,
        is_alive: false
      };
    case ACTIONS.SET_ADMIN:
      return {
        ...state,
        is_admin: true
      };
    case ACTIONS.RESET_ADMIN:
      return {
        ...state,
        is_admin: false
      };
    case ACTIONS.SET_HAND:
      return {
        ...state,
        hand: payload
      };
    case ACTIONS.RESET_HAND:
      return {
        ...state,
        hand: []
      }
    case ACTIONS.DISCARD_HAND:
      // make sure to only filter one card, in case more than 1 deck (52 cards) is played
      const newHand = state.hand.splice(payload, 1);
      return {
        ...state,
        hand: newHand
      };
    case ACTIONS.ADD_HAND:
      return {
        ...state,
        hand: [...state.hand, payload]
      };

    default:
      return state;
  }
}

export default reducer;

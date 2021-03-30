import { ActionType } from "../types"
import { Player, Card } from '../../types';

export const ACTIONS = {
  RESET_PLAYER: 'RESET_PLAYER',
  SET_NAME: 'SET_NAME',
  SET_ID: 'SET_ID',
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
  name: '',
  is_alive: false,
  is_admin: false,
  hand: []
}

export default (state = initialState, action: ActionType) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.RESET_PLAYER:
      state = initialState
      return state;
    case ACTIONS.SET_NAME:
      state.name = payload;
      return state;
    case ACTIONS.SET_ID:
      state.id_player = payload;
      return state;
    case ACTIONS.SET_ALIVE:
      state.is_alive = true;
      return state;
    case ACTIONS.SET_DEAD:
      state.is_alive = false;
      return state;
    case ACTIONS.SET_ADMIN:
      state.is_admin = true;
      return state;
    case ACTIONS.RESET_ADMIN:
      state.is_admin = false;
      return state;
    case ACTIONS.SET_HAND:
      state.hand = payload;
      return state;
    case ACTIONS.RESET_HAND:
      state.hand = [];
      return state;
    case ACTIONS.DISCARD_HAND:
      // make sure to only filter one card, in case more than 1 deck (52 cards) is played
      state.hand = state.hand.filter((card: Card) => card.rank !== payload.rank
        && card.pattern !== payload.pattern);
      return state;
    case ACTIONS.ADD_HAND:
      state.hand.push(payload);
      return state;

    default:
      return state;
  }
}

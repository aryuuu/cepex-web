export type Room = {
  id_room: string;
  capacity: number;
  id_host: string;
  is_started: boolean;
  is_clockwise: boolean;
  players: Player[];
  deck: Card[];
  id_player_in_turn: string;
  count: number;
}

export type Player = {
  id_player: string;
  avatar_url: string;
  name: string;
  is_alive: boolean;
  is_admin: boolean;
  hand: Card[];
}

export type Card = {
  rank: number;
  pattern: number;
}

export type Socket = {
  socket: WebSocket;
}

export type Chat = {
  sender: string;
  message: string;
}

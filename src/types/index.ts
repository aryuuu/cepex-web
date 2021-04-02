export type Room = {
  id_room: string;
  capacity: number;
  id_host: string;
  is_started: boolean;
  is_clockwise: boolean;
  players: Player[];
  deck: Card[];
  count: number;
}

export type Player = {
  id_player: string;
  name: string;
  is_alive: boolean;
  is_admin: boolean;
  hand: Card[];
}

export type Card = {
  rank: number;
  pattern: string;
}

export type Socket = {
  socket: WebSocket;
}

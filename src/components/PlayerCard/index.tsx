import React from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Grid, Tooltip, Typography } from '@material-ui/core';
import { Player } from '../../types';
import { useStyles } from './style';
import { RootState } from '../../redux/reducers/rootReducer';
import { ACTIONS as GAME_ACTIONS } from '../../redux/reducers/gameReducer';

interface Prop {
  players: Player[];
}

const PlayerCard = (properties: Prop) => {
  const {
    players,
  } = properties;
  const styles = useStyles();
  const dispatch = useDispatch();
  const {
    is_choosing: isChoosing,
    is_choosing_player: isChoosingPlayer,
    choosen_card_index: choosenCardIdx,
  } = useSelector(
    (state: RootState) => state.gameReducer);

  const {
    id_player_in_turn: playerInTurnId,
  } = useSelector((state: RootState) =>
    state.roomReducer);

  const socket = useSelector((state: RootState) => state.socketReducer.socket);

  const degree = Math.PI / 180;
  const fraction = 360 / players.length;

  const renderPlayer = players.map((item: Player, index: number) => {
    let avaType = styles.alive;

    if (item.id_player === playerInTurnId) {
      avaType = styles.inTurn
    } else if (!item.is_alive) {
      avaType = styles.dead
    }

    return (
      <Tooltip title={`score: ${item.score}`} key={`player-${index}`}>
        <Grid
          style={{
            transform: `translate(${Math.cos(fraction * index * degree) * 150}px,
            ${Math.sin(fraction * index * degree) * 150}px)`,
            position: 'absolute',
            zIndex: isChoosing ? 1000 : 1
          }}
        >
          <Grid
            className={styles.avatarCont}
            onClick={() => {
              if (isChoosing && item.is_alive) {
                socket.send(JSON.stringify({
                  event_type: "play-card",
                  hand_index: choosenCardIdx,
                  is_add: true,
                  id_player: item.id_player
                }));
                dispatch({
                  type: GAME_ACTIONS.SET_NOT_CHOOSING
                });
              } else if (isChoosingPlayer) {
                socket.send(JSON.stringify({
                  event_type: "kick-player",
                  id_player: item.id_player
                }));
                dispatch({
                  type: GAME_ACTIONS.SET_NOT_CHOOSING_PLAYER
                });
              }
            }}
          >
            <Avatar
              className={
                clsx(styles.avatar, avaType)
              }
              alt={item.name}
              src={item.avatar_url}
            >
            </Avatar>

            <Typography align='center'>
              {item.name}
            </Typography>
          </Grid>
        </Grid >
      </Tooltip>
    );
  });

  return (
    <Grid className={styles.container}>
      {renderPlayer}
    </Grid>
  )
}

export default PlayerCard;

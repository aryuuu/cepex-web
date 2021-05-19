import React from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Grid, Typography } from '@material-ui/core';
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
    choosen_card_index: choosenCardIdx,
  } = useSelector(
    (state: RootState) => state.gameReducer);
  const playerInTurnIdx = useSelector((state: RootState) =>
    state.roomReducer.idx_player_in_turn);
  const socket = useSelector((state: RootState) => state.socketReducer.socket);

  const degree = Math.PI / 180;
  const fraction = 360 / players.length;

  const renderPlayer = players.map((item: Player, index: number) => {
    let avaType;
    if (index === playerInTurnIdx) {
      avaType = styles.inTurn
    } else if (!item.is_alive) {
      avaType = styles.dead
    }

    return (
      <Grid
        key={`player-${index}`}
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
            if (isChoosing) {
              console.log(`player is choosing player ${item.id_player}`);
              socket.send(JSON.stringify({
                event_type: "play-card",
                hand_index: choosenCardIdx,
                is_add: true,
                id_player: item.id_player
              }));
              dispatch({
                type: GAME_ACTIONS.SET_NOT_CHOOSING
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
    );
  });

  return (
    <Grid className={styles.container}>
      {renderPlayer}
    </Grid>
  )
}

export default PlayerCard;

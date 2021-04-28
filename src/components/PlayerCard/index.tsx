import React from 'react';

import { Avatar, Grid, Typography } from '@material-ui/core';
import { Player } from '../../types';
import { useStyles } from './style';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';
import clsx from 'clsx';

interface Prop {
  players: Player[];
}

const PlayerCard = (properties: Prop) => {
  const { players } = properties;
  const styles = useStyles();
  const playerInTurnIdx = useSelector((state: RootState) =>
    state.roomReducer.idx_player_in_turn);

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
          transform: `translate(${Math.cos(fraction * index * degree) * 120}px,
          ${Math.sin(fraction * index * degree) * 120}px)`,
          position: 'absolute',
        }}
      >
        <Grid
          className={styles.avatarCont}
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
      </Grid>
    );
  });

  return (
    <Grid
      className={styles.container}
    >
      {renderPlayer}
    </Grid>
  )
}

export default PlayerCard;

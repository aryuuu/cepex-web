import React from 'react';

import { Avatar, Grid } from '@material-ui/core';
import { Player } from '../../types';
import { useStyles } from './style';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';

interface Prop {
  players: Player[];
}

const PlayerCard = (properties: Prop) => {
  const { players } = properties;
  const styles = useStyles();
  const playerInTurnId = useSelector((state: RootState) => state.roomReducer.id_player_in_turn);

  const degree = Math.PI / 180;
  const fraction = 360 / players.length;

  const renderPlayer = players.map((item: Player, index: number) => {
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
            className={styles.avatar}
            alt={item.name}
            src={item.avatar_url}
          >

          </Avatar>
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

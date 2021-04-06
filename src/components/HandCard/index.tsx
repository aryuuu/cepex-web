import React from 'react';
import { Grid } from '@material-ui/core';
import { Card } from '../../types';
import { useStyles } from './style';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';

interface Prop {
  cards: Card[]
}

const PATTERNS = [
  'diamonds',
  'clubs',
  'hearts',
  'spades',
]

const HandCard = (properties: Prop) => {
  const { cards } = properties;
  const styles = useStyles();
  const socket = useSelector((state: RootState) => state.socketReducer.socket);

  const onPlayCard = (index: number) => {
    socket.send(JSON.stringify({
      event_type: "play-card",
      hand_index: index,
      is_add: true,
    }));
  }

  const renderCard = cards.map((item: Card, index: number) => {
    return (
      <Grid
        key={`card-${index}`}
        className={styles.card}
        onClick={() => onPlayCard(index)}
      >
        <img
          alt={`${item.rank} of ${PATTERNS[item.pattern]}`}
          src={'/cards/' + item.rank + '_of_' + PATTERNS[item.pattern] + '.png'}
          style={{
            maxWidth: '100%'
          }}
        />
      </Grid>
    )
  });

  return (
    <Grid
      container
      item
      direction="row"
      alignItems="center"
      className={styles.container}
    >
      <Grid
        container
        item
        direction="row"
        alignItems="center"
      >
        {renderCard}
      </Grid>
    </Grid>
  )
}

export default HandCard;

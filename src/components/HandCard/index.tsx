import react from 'react';
import { Grid } from '@material-ui/core';
import { Card } from '../../types';
import { useStyles } from './style';

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

  const renderCard = cards.map((item: Card, index: number) => {
    return (
      <Grid
        key={`card-${index}`}
        className={styles.card}
      >
        <img
          alt={`${item.rank} of ${PATTERNS[item.pattern]}`}
          // src={`/cards/${item.rank}_of_${PATTERNS[item.pattern]}.png`}
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
      className={styles.container}
    >
      {renderCard}
    </Grid>
  )
}

export default HandCard;

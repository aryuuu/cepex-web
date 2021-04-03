import react from 'react';
import { Grid } from '@material-ui/core';
import { Card } from '../../types';

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

  const renderCard = cards.map((item: Card, index: number) => {
    return (
      <Grid
        key={`card-${index}`}
      >
        <img
          alt={`${item.rank} of ${PATTERNS[item.pattern]}`}
          // src={`/cards/${item.rank}_of_${PATTERNS[item.pattern]}.png`}
          src={'/cards/' + item.rank + '_of_' + PATTERNS[item.pattern] + '.png'}
        />
      </Grid>
    )
  });

  return (
    <Grid>
      {renderCard}
    </Grid>
  )
}

export default HandCard;

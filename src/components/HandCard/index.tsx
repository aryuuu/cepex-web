import React, { useState } from 'react';
import { Collapse, Grid } from '@material-ui/core';
import { Add, Remove } from '@material-ui/icons';
import { Card, PATTERNS } from '../../types';
import { useStyles } from './style';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';

interface Prop {
  cards: Card[]
}

interface ItemProp {
  key: number;
  idx: number;
  item: Card;
}

const ItemCard = (properties: ItemProp) => {
  const { item, idx } = properties;

  const styles = useStyles();
  const isUpDown = item.rank === 1 || item.rank === 11 || item.rank === 12;
  const [show, setShow] = useState(false);
  const socket = useSelector((state: RootState) => state.socketReducer.socket);

  const onPlayCard = (isAdd: boolean) => {
    socket.send(JSON.stringify({
      event_type: "play-card",
      hand_index: idx,
      is_add: isAdd,
    }));
  }

  return (
    <Grid
      key={`card-${idx}`}
      className={styles.card}
      onClick={() => onPlayCard(true)}
      onMouseOver={() => setShow(true)}
      onMouseOut={() => setShow(false)}
    >
      <img
        alt={`${item.rank} of ${PATTERNS[item.pattern]}`}
        src={'/cards/' + item.rank + '_of_' + PATTERNS[item.pattern] + '.png'}
        style={{
          maxWidth: '100%'
        }}
      />
      {
        isUpDown &&
        <Collapse in={show}>
          <Grid container direction="column" className={styles.choice}>
            <Grid
              container
              item
              className={styles.button}
              direction="row"
              onClick={() => onPlayCard(true)}
            >
              <Add fontSize="large" />
            </Grid>
            <Grid
              container
              item
              className={styles.button}
              direction="row"
              onClick={() => onPlayCard(false)}
            >
              <Remove fontSize="large" />
            </Grid>
          </Grid>
        </Collapse>
      }
    </Grid>
  )
}

const HandCard = (properties: Prop) => {
  const { cards } = properties;
  const styles = useStyles();

  const renderCard = cards.map((item: Card, index: number) => {
    return (
      <ItemCard
        key={index}
        idx={index}
        item={item}
      />
    );
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

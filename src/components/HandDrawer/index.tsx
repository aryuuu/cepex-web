import React from 'react';
import { useSelector } from 'react-redux';
import { SwipeableDrawer, Grid, Typography, Box } from '@material-ui/core';

import { RootState } from '../../redux/reducers/rootReducer';
import { useStyles } from './style';
import HandCard from '../HandCard';

interface Prop {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onStartGame: () => void;
  onLeaveRoom: () => void;
  onShowLeaderboard: () => void;
  onChooseVKTarget: () => void;
}

const HandDrawer = (properties: Prop) => {
  const {
    show,
    setShow,
  } = properties;

  const {
    hand,
  } = useSelector((state: RootState) => state.playerReducer);

  const styles = useStyles();

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={show}
      onOpen={() => setShow(true)}
      onClose={() => setShow(false)}
      disableSwipeToOpen={false}
      swipeAreaWidth={20}
    >
      <Box className={styles.swipeEdge}>
        <Box className={styles.pullerTab}/>
        <Typography>test</Typography>
      </Box>
      <Grid
        item
        container
        direction="column"
        className={styles.drawer}
      >
        { hand.length 
          ? 
          <HandCard
            cards={hand}
          />
          : 
          <Grid className={styles.emptyCards} item container justify="center" alignItems="center">
            <Typography style={{ color: 'white'}}>No cards available</Typography>
          </Grid>
        }
      </Grid>
    </SwipeableDrawer>
  )
}

export default HandDrawer;

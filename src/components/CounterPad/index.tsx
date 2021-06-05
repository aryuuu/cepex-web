import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { RootState } from '../../redux/reducers/rootReducer';
import { useStyles } from './style';

const CounterPad = () => {
  const styles = useStyles();
  const count = useSelector((state: RootState) => state.roomReducer.count);
  return (
    <Grid
      item
      container
      className={styles.counterPad}
      direction="row"
      alignItems="center"
      justify="center"
      style={{
        // width: `${2 + (count * 3 / 100)}vw`,
        // height: `${2 + (count * 3 / 100)}vw`,
        transform: `scale(${1 + (count / 50)})`
      }}>
      {count}
    </Grid>
  )
}

export default CounterPad;

import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { RootState } from '../../redux/reducers/rootReducer';
import { useStyles } from './style';
import ClockwiseRotate from '@material-ui/icons/Autorenew';
import CounterClockwiseRotate from '@material-ui/icons/Loop';

const CounterPad = () => {
  const styles = useStyles();
  const count = useSelector((state: RootState) => state.roomReducer.count);
  const isClockwise = useSelector((state: RootState) => state.roomReducer.is_clockwise);
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
      {
        isClockwise
          ? <ClockwiseRotate 
            fontSize="large" 
            style={{ 
              color: 'white', 
              opacity: '0.3',
              transform: `scale(${2.5})`,
              position: 'absolute' 
            }} 
          />
          : <CounterClockwiseRotate 
            fontSize="large" 
            style={{ 
              color: 'white', 
              opacity: '0.3',
              transform: `scale(${2.5})`,
              position: 'absolute' 
            }} 
          />
      }
      {count}
    </Grid>
  )
}

export default CounterPad;

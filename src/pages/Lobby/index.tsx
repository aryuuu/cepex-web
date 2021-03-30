import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';
import Button from '@material-ui/core/Button';


const Lobby = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const count = useSelector((state: RootState): number =>
    state.gameReducer.count);

  useEffect(() => {
    document.title = 'Lobby | Cepex';
  }, []);

  const onIncrement = () => {
    dispatch({
      type: 'INCREMENT_COUNT'
    })
  }

  const onNavigateRoom = () => {
    history.push('/room')
  }

  return (
    <>
      <h1>Home</h1>
      <h2>Count: {count}</h2>
      {/* <button onClick={() => onIncrement()}>Increment</button> */}
      <Button variant="contained" color="primary" onClick={() => onIncrement()}>
        Increment
      </Button>
      <h2 onClick={() => onNavigateRoom()}>Room</h2>
    </>
  );
}

export default Lobby;

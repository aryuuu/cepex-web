import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';

const Room = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const count = useSelector((state: RootState):
    number => state.gameReducer.count);

  useEffect(() => {
    document.title = 'Room | Cepex';
  }, []);

  const onDecrement = () => {
    dispatch({
      type: 'DECREMENT_COUNT'
    })
  }

  const onNavigateHome = () => {
    history.push('/');
  }

  return (
    <>
      <h1>Room</h1>
      <h2>Count: {count}</h2>
      <button onClick={() => onDecrement()}>Decrement</button>
      <h2 onClick={() => onNavigateHome()}>Home</h2>
    </>
  );
}

export default Room;

import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './style';
import { ACTIONS } from '../../redux/reducers/playerReducer';

const Home = () => {
  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => state.playerReducer.name);
  const socket = useSelector((state: RootState) => state.socketReducer.socket);

  useEffect(() => {
    document.title = 'Home | Cepex';
    // console.log(socket);
  }, []);

  const onCreate = () => {
    console.log('create');
    socket.send('create');
  }

  // socket.onmessage((ev: MessageEvent<any>) => {
  //   console.log(ev);
  //   return null;
  // })

  const onNavigateRoom = () => {
    history.push('/room')
  }

  const onChangeDisplayName = (value: string) => {
    dispatch({
      type: ACTIONS.SET_NAME,
      payload: value
    })
  }

  return (
    <Container>
      <CssBaseline />
      <Grid alignItems="center" container direction="column">
        <Grid
          item
          direction="column"
          container
          alignItems="center"
          xs={4}
        >
          <Avatar className={styles.avatar}>

          </Avatar>
          <TextField
            className={styles.form}
            name="displayname"
            variant="outlined"
            required
            fullWidth
            id="displayname"
            label="Display Name"
            autoFocus
            onChange={(e) => onChangeDisplayName(e.target.value)}
          />
          <Button
            fullWidth
            onClick={() => onCreate()}
            variant="contained"
            color="primary"
          >
            Create
          </Button>
          <Typography>
            {name === '' ? '' : `Hello ${name}`}
          </Typography>
          <h2 onClick={() => onNavigateRoom()}>Room</h2>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;

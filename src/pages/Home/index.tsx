import React, { useState, useEffect } from 'react';
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
import Input from '@material-ui/core/Input';
import { useStyles } from './style';
import { ACTIONS as PLAYER_ACTIONS } from '../../redux/reducers/playerReducer';
import { ACTIONS as GAME_ACTIONS } from '../../redux/reducers/gameReducer';
import { ACTIONS as SOCKET_ACTIONS } from '../../redux/reducers/socketReducer';
import axios from 'axios';
import { cepexApiBaseUrl } from '../../configs';

const Home = () => {
  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [image, setImage] = useState({} as File);
  const [message, setMessage] = useState('');
  const [isCreate, setIsCreate] = useState(false);
  const name = useSelector((state: RootState) => state.playerReducer.name);
  const socket = useSelector((state: RootState) => state.socketReducer.socket);
  const roomId = useSelector((state: RootState) => state.gameReducer.roomId);
  const avatarUrl = useSelector((state: RootState) => state.playerReducer.avatar_url);

  useEffect(() => {
    document.title = 'Home | Cepex';
  }, []);

  const onCreate = async () => {
    setIsCreate(true);
    try {
      const response = await axios.get('http://localhost:3001/game/create');
      console.log(response.data);
      console.log('create');
      dispatch({
        type: GAME_ACTIONS.SET_ROOM_ID,
        payload: response.data,
      });
      dispatch({
        type: SOCKET_ACTIONS.INIT_SOCKET,
        payload: response.data,
      });
    } catch (err) {
      console.log(err)
    }
  }

  const onJoin = () => {
    setIsCreate(false);
    dispatch({
      type: SOCKET_ACTIONS.INIT_SOCKET,
      payload: roomId
    });
  }

  const onSend = () => {
    socket.send(JSON.stringify({
      event_type: "chat",
      message: message
    }));
  }

  const onUpload = async () => {
    if (image.name) {
      const formData = new FormData();

      formData.append('profile_picture', image);

      try {
        const response = await axios.post(`${cepexApiBaseUrl}/profile/picture`, formData, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
          }
        });

        dispatch({
          type: PLAYER_ACTIONS.SET_AVATAR,
          payload: response.data.data
        })
      } catch (err) {
        console.log(err);
      }
    }
  }

  const onNavigateRoom = () => {
    history.push(`/room/${roomId}`);
  }

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      setImage(newImage)
    }
  }

  const onChangeDisplayName = (value: string) => {
    dispatch({
      type: PLAYER_ACTIONS.SET_NAME,
      payload: value
    })
  }

  const onInputRoomId = (value: string) => {
    dispatch({
      type: GAME_ACTIONS.SET_ROOM_ID,
      payload: value
    })
  }

  socket.onopen = () => {
    console.log('connected to websocket server');
    socket.send(JSON.stringify({
      event_type: isCreate ? "create-room" : "join-room",
      message: "",
    }));
  }

  socket.onmessage = (ev) => {
    const data = JSON.parse(ev.data);
    console.log(data);

    switch (data.event_type) {
      case "create-room":
        onNavigateRoom();
        break;
      case "join-room":
        onNavigateRoom();
        break;
      default:
        break;
    }

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
          <Grid
            item
            direction="row"
            container
            alignItems="center"
            alignContent="center"
          >
            <Avatar
              className={styles.avatar}
              alt="Player"
              src={avatarUrl}
            >
            </Avatar>
            <input
              type="file"
              accept="image/*"
              // hidden
              onChange={(e) => onFileChange(e)}
            />
            <Button
              // fullWidth
              onClick={() => onUpload()}
              variant="contained"
              color="primary"
            >
              Upload
            </Button>
          </Grid>
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
          <TextField
            className={styles.form}
            name="Room ID"
            variant="outlined"
            required
            fullWidth
            id="roomid"
            label="Room ID"
            autoFocus
            onChange={(e) => onInputRoomId(e.target.value)}
          />
          <Button
            fullWidth
            onClick={() => onJoin()}
            variant="contained"
            color="primary"
          >
            Join
          </Button>
          <TextField
            className={styles.form}
            name="Message"
            variant="outlined"
            required
            fullWidth
            id="message"
            label="Message"
            autoFocus
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            fullWidth
            onClick={() => onSend()}
            variant="contained"
            color="primary"
          >
            Send
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


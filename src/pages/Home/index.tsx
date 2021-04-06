import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useStyles } from './style';
import { cepexApiBaseUrl } from '../../configs';
import { ACTIONS as GAME_ACTIONS } from '../../redux/reducers/gameReducer';
import { ACTIONS as ROOM_ACTIONS } from '../../redux/reducers/roomReducer';
import { ACTIONS as PLAYER_ACTIONS } from '../../redux/reducers/playerReducer';
import { ACTIONS as SOCKET_ACTIONS } from '../../redux/reducers/socketReducer';

const Home = () => {
  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [image, setImage] = useState({} as File);
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

  const onFileChange = (event: any) => {
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
    console.log(`name: ${name}`);
    socket.send(JSON.stringify({
      event_type: isCreate ? "create-room" : "join-room",
      client_name: name,
      avatar_url: avatarUrl,
    }));
  }

  socket.onmessage = (ev) => {
    const data = JSON.parse(ev.data);
    console.log(data);

    switch (data.event_type) {
      case "create-room":
        dispatch({
          type: PLAYER_ACTIONS.SET_HAND,
          payload: data.hand
        });
        onNavigateRoom();
        dispatch({
          type: ROOM_ACTIONS.SET_ROOM,
          payload: data.room
        })
        dispatch({
          type: PLAYER_ACTIONS.SET_ADMIN,
        })
        break;
      case "join-room":
        console.log(`joining room ${roomId}`);
        dispatch({
          type: PLAYER_ACTIONS.SET_HAND,
          payload: data.hand,
        })
        dispatch({
          type: ROOM_ACTIONS.SET_ROOM,
          payload: data.new_room
        })
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
            direction="column"
            container
            alignItems="center"
            alignContent="center"
          >
            <label
              htmlFor="upload-avatar"
            >
              <Avatar
                className={styles.avatar}
                alt={name}
                src={avatarUrl}
              >
              </Avatar>

            </label>
            {/* <Input
              type="file"
              onChange={(e) => onFileChange(e)}
              style={{
                display: 'none'
              }}
              id="upload-avatar"
            // disableUnderline={true}
            /> */}

            <input
              id="upload-avatar"
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => onFileChange(e)}
            />
            {
              image.name ? <Typography>{image.name}</Typography> : ''
            }
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
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;


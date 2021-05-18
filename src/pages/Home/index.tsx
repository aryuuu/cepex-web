import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import { useStyles } from './style';
import { cepexApiBaseUrl } from '../../configs';
import { ACTIONS as ROOM_ACTIONS } from '../../redux/reducers/roomReducer';
import { ACTIONS as PLAYER_ACTIONS } from '../../redux/reducers/playerReducer';
import { ACTIONS as SOCKET_ACTIONS } from '../../redux/reducers/socketReducer';
import { uploadProfilePicture } from '../../helpers';

const Home = () => {
  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [image, setImage] = useState({} as File);
  const [isCreate, setIsCreate] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const {
    name,
    avatar_url: avatarUrl
  } = useSelector((state: RootState) => state.playerReducer);
  const {
    id_room: roomId,
  } = useSelector((state: RootState) => state.roomReducer);
  const socket = useSelector((state: RootState) => state.socketReducer.socket);

  useEffect(() => {
    document.title = 'Home | Cepex';
  }, []);

  useEffect(() => {
    if (image.name) {
      setShowProgress(true);
      const formData = new FormData();
      formData.append('profile_picture', image);

      uploadProfilePicture(formData)
        .then(res => {
          dispatch({
            type: PLAYER_ACTIONS.SET_AVATAR,
            payload: res.data.data
          });
          setShowProgress(false);
        })
        .catch(err => console.log(err));
    }
  }, [image, dispatch]);

  const onCreate = async () => {
    setIsCreate(true);
    try {
      const response = await axios.get(`${cepexApiBaseUrl}/game/create`);
      console.log(response.data);
      console.log('create');
      dispatch({
        type: ROOM_ACTIONS.SET_ID,
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
      type: ROOM_ACTIONS.SET_ID,
      payload: value
    })
  }

  socket.onerror = () => {
    dispatch({
      type: ROOM_ACTIONS.RESET_ROOM
    });
    dispatch({
      type: SOCKET_ACTIONS.REMOVE_SOCKET
    });
    Swal.fire({
      icon: 'warning',
      title: 'Connection lost :('
    });
  }

  socket.onclose = () => {
    dispatch({
      type: ROOM_ACTIONS.RESET_ROOM
    });
    dispatch({
      type: SOCKET_ACTIONS.REMOVE_SOCKET
    });
    Swal.fire({
      icon: 'warning',
      title: 'Connection lost :('
    });
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
        onNavigateRoom();
        dispatch({
          type: PLAYER_ACTIONS.SET_ID,
          payload: data.room.id_host
        })
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
        console.log(`new `);
        if (!data.success) {
          return Swal.fire({
            icon: 'error',
            title: 'Failed to join room, please check the room ID'
          });
        }
        const newPlayer = data.new_room.players[data.new_room.players.length - 1];
        dispatch({
          type: PLAYER_ACTIONS.SET_ID,
          payload: newPlayer.id_player
        })
        dispatch({
          type: ROOM_ACTIONS.SET_ROOM,
          payload: data.new_room
        });
        onNavigateRoom();
        break;
      default:
        break;
    }
  }

  return (
    <Container>
      <CssBaseline />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid alignItems="center" item container direction="column">
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
                <Tooltip
                  title="upload"
                >
                  <Avatar
                    className={styles.avatar}
                    alt={name}
                    src={avatarUrl}
                  >
                    {
                      showProgress
                        ? <CircularProgress />
                        : <AddIcon fontSize="large" />
                    }
                  </Avatar>
                </Tooltip>

              </label>

              <input
                id="upload-avatar"
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => onFileChange(e)}
              />
              {
                name
                  ? <Typography color="textPrimary" variant="h5">{name}</Typography>
                  : <Typography color="textSecondary">Display name</Typography>
              }
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
              value={name}
              onChange={(e) => onChangeDisplayName(e.target.value)}
            />

            <TextField
              className={styles.form}
              name="Room ID"
              variant="outlined"
              fullWidth
              id="roomid"
              label="Room ID"
              autoFocus
              defaultValue={roomId}
              onChange={(e) => onInputRoomId(e.target.value)}
            />
            <Button
              fullWidth
              onClick={() => onJoin()}
              variant="contained"
              color="primary"
              disabled={roomId === ''}
            >
              Join
          </Button>
            <Typography variant="h4">
              or
          </Typography>
            <Button
              fullWidth
              onClick={() => onCreate()}
              variant="contained"
              color="primary"
            >
              Create
          </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;


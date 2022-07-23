import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import imageCompression from 'browser-image-compression';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './style';
import { cepexApiBaseUrl } from '../../configs';
import { uploadProfilePicture } from '../../helpers';
import { RootState } from '../../redux/reducers/rootReducer';
import { ACTIONS as ROOM_ACTIONS } from '../../redux/reducers/roomReducer';
import { ACTIONS as PLAYER_ACTIONS } from '../../redux/reducers/playerReducer';
import { ACTIONS as SOCKET_ACTIONS } from '../../redux/reducers/socketReducer';

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

      const reader = new FileReader();
      reader.readAsDataURL(image);

      reader.onload = () => {
        if (typeof reader.result === "string") {
          const formData = new FormData();
          const avatarBase64 = reader.result.split(",")[1];
          formData.append('avatar', avatarBase64);

          uploadProfilePicture(formData)
            .then(res => {
              dispatch({
                type: PLAYER_ACTIONS.SET_AVATAR,
                payload: res.data.data
              });
              setShowProgress(false);
            })
            .catch(err => err);
        }
      }
      
      reader.onerror = () => {
      }

    }
  }, [image, dispatch]);


  const onCreate = async () => {
    let sanitizedName = name.trim();
    if (sanitizedName === "") {
      return Swal.fire({
        icon: 'warning',
        title: 'missing display name'
      })
    }
    setIsCreate(true);
    try {
      const response = await axios.get(`${cepexApiBaseUrl}/game/create`);
      dispatch({
        type: ROOM_ACTIONS.SET_ID,
        payload: response.data,
      });
      dispatch({
        type: SOCKET_ACTIONS.INIT_SOCKET,
        payload: response.data,
      });
    } catch (err) {
    }
  }

  const onJoin = () => {
    let sanitizedName = name.trim();
    if (sanitizedName === "") {
      return Swal.fire({
        icon: 'warning',
        title: 'missing display name'
      })
    }
    setIsCreate(false);
    dispatch({
      type: SOCKET_ACTIONS.INIT_SOCKET,
      payload: roomId
    });
  }

  const onNavigateRoom = () => {
    history.push(`/room/${roomId}`);
  }

  const onFileChange = async (event: any) => {
    const newImage = event.target?.files?.[0];

    if (newImage) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 300
      }

      try {
        const compressedImage = await imageCompression(newImage, options);
        setImage(compressedImage);
      } catch (err) {
        
      }
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
    socket.send(JSON.stringify({
      event_type: isCreate ? "create-room" : "join-room",
      client_name: name,
      avatar_url: avatarUrl,
    }));
  }

  socket.onmessage = (ev) => {
    const data = JSON.parse(ev.data);
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
        if (!data.success) {
          const errorMessage = data.detail ? data.detail : 'Failed to join room, please check the room ID'
          return Swal.fire({
            icon: 'error',
            title: errorMessage
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
    <>
      <CssBaseline />
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={styles.container}
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
                <Tooltip title="upload">
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
                  ? <Typography color="textPrimary" variant="h5" style={{ color: 'white' }}>{name}</Typography>
                  : <Typography color="textSecondary" style={{ color: 'white' }}>Display name</Typography>
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
              style={{ color: 'white' }}
              InputProps={{
                classes: {
                  notchedOutline: styles.notchedOutline
                },
                style: {
                  color: 'white'
                }
              }}
              InputLabelProps={{
                style: {
                  color: 'white'
                }
              }}
            />

            <TextField
              className={styles.form}
              name="Room ID"
              variant="outlined"
              fullWidth
              id="roomid"
              label="Room ID"
              defaultValue={roomId}
              onChange={(e) => onInputRoomId(e.target.value)}
              style={{ color: 'white' }}
              InputProps={{
                classes: {
                  notchedOutline: styles.notchedOutline
                },
                style: {
                  color: 'white'
                }
              }}
              InputLabelProps={{
                style: {
                  color: 'white'
                }
              }}
            />
            <Button
              classes={{
                disabled: styles.disabledButton,
                root: styles.normalButton,
              }}
              fullWidth
              onClick={() => onJoin()}
              disabled={roomId === '' || name === ''}
            >
              Join
          </Button>
            <Typography variant="h4" style={{ color: 'white' }}>
              or
          </Typography>
            <Button
              classes={{
                disabled: styles.disabledButton,
                root: styles.normalButton,
              }}
              fullWidth
              onClick={() => onCreate()}
              disabled={name === ''}
            >
              Create
          </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;


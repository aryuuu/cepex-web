import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useStyles } from './style';
import { ACTIONS as GAME_ACTIONS } from '../../redux/reducers/gameReducer';
import { ACTIONS as PLAYER_ACTIONS } from '../../redux/reducers/playerReducer';
import { ACTIONS as SOCKET_ACTIONS } from '../../redux/reducers/socketReducer';
import { ACTIONS as ROOM_ACTIONS } from '../../redux/reducers/roomReducer';
import { Chat } from '../../types';
import ChatCard from '../../components/ChatCard';
import HandCard from '../../components/HandCard';
import PlayerCard from '../../components/PlayerCard';



const Room = () => {
  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<Chat[]>([]);
  const name = useSelector((state: RootState) => state.playerReducer.name);
  const hand = useSelector((state: RootState) => state.playerReducer.hand);
  const playerId = useSelector((state: RootState) => state.playerReducer.id_player);
  const avatarUrl = useSelector((state: RootState) => state.playerReducer.avatar_url);
  const isAdmin = useSelector((state: RootState) => state.playerReducer.is_admin);
  const socket = useSelector((state: RootState) => state.socketReducer.socket);
  const players = useSelector((state: RootState) => state.roomReducer.players);
  const count = useSelector((state: RootState) => state.roomReducer.count);


  useEffect(() => {
    document.title = 'Room | Cepex';
  }, []);

  const onNavigateHome = () => {
    history.push('/');
  }

  const onStartGame = () => {
    socket.send(JSON.stringify({
      event_type: "start-game"
    }))
  }

  const onSend = () => {
    socket.send(JSON.stringify({
      event_type: "chat",
      message: message
    }));
  }

  socket.onmessage = (ev) => {
    const data = JSON.parse(ev.data);
    console.log(data);

    switch (data.event_type) {
      case "message-broadcast":
        setChats([...chats, data])
        break;
      case "join-room-broadcast":
        if (data.new_player.id_player !== playerId) {
          dispatch({
            type: ROOM_ACTIONS.ADD_PLAYER,
            payload: data.new_player
          });
        }
        break;
      case "leave-room":
        break;
      case "leave-room-broadcast":
        break;
      case "start-game":
        if (data.success) {
          dispatch({
            type: ROOM_ACTIONS.SET_START
          });
        }
        break;
      case "start-game-broadcast":
        dispatch({
          type: ROOM_ACTIONS.SET_START
        });
        break;
      case "play-card":
        if (data.success) {
          dispatch({
            type: PLAYER_ACTIONS.SET_HAND,
            payload: data.new_hand
          })
        } else {
          alert('invalid move');
        }
        break;
      case "play-card-broadcast":
        dispatch({
          type: ROOM_ACTIONS.SET_COUNT,
          payload: data.count
        });
        break;
      case "turn-broadcast":
        break;

      default:
        break;
    }
  }

  return (
    <Container
      className={styles.roomCont}
    >
      <CssBaseline />
      <Grid
        container
        className={styles.room}
        direction="row"
        alignItems="center"
      >
        <Grid
          className={styles.profile}
          item
          container
          direction="column"
          alignItems="center"
          xs={3}
        >
          <Avatar
            className={styles.avatar}
            alt={name}
            src={avatarUrl}
          >
          </Avatar>
          <Typography>
            {name}
          </Typography>
          <HandCard
            cards={hand}
          />
          {
            isAdmin
              ? <Button
                onClick={() => onStartGame()}
                variant="contained"
                fullWidth
                color="primary"
              >
                Start
              </Button>
              : ''
          }
        </Grid>
        <Grid
          className={styles.table}
          item
          container
          direction="column"
          alignItems="center"
          xs={6}
        >
          <PlayerCard
            players={players}
          />
          <Typography>
            {count}
          </Typography>
        </Grid>
        <Grid
          className={styles.chat}
          item
          container
          direction="column"
          alignItems="center"
          xs={3}
        >
          <ChatCard
            chats={chats}
          />
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
        </Grid>
      </Grid>
    </Container>
  );
}

export default Room;

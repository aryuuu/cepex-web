import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
import Spotlight from 'rc-spotlight';
import Swal from 'sweetalert2';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Backdrop from '@material-ui/core/Backdrop';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useStyles } from './style';
import { Card, Chat, PATTERNS } from '../../types';
import ChatCard from '../../components/ChatCard';
import HandCard from '../../components/HandCard';
import PlayerCard from '../../components/PlayerCard';
import { RootState } from '../../redux/reducers/rootReducer';
import { ACTIONS as GAME_ACTIONS } from '../../redux/reducers/gameReducer';
import { ACTIONS as ROOM_ACTIONS } from '../../redux/reducers/roomReducer';
import { ACTIONS as PLAYER_ACTIONS } from '../../redux/reducers/playerReducer';
import { ACTIONS as SOCKET_ACTIONS } from '../../redux/reducers/socketReducer';

interface MatchParams {
  roomId: string;
}

interface Props extends RouteComponentProps<MatchParams> { }

const Room = (props: Props) => {
  const styles = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState<Chat[]>([]);
  const {
    name,
    hand,
    id_player: playerId,
    is_admin: isAdmin,
    avatar_url: avatarUrl,
  } = useSelector((state: RootState) => state.playerReducer);
  const {
    players,
    count,
    last_card: lastCard,
    is_started: isStarted,
  } = useSelector((state: RootState) => state.roomReducer);
  const socket = useSelector((state: RootState) => state.socketReducer.socket);
  const isChoosing = useSelector(
    (state: RootState) => state.gameReducer.is_choosing);


  useEffect(() => {
    document.title = 'Room | Cepex';
    if (socket.url == null) {
      dispatch({
        type: ROOM_ACTIONS.SET_ID,
        payload: props.match.params.roomId
      });
      onNavigateHome()
    }
  });

  const onNavigateHome = () => {
    history.push('/');
  }

  const onStartGame = () => {
    socket.send(JSON.stringify({
      event_type: "start-game"
    }))
  }

  const onSend = () => {
    if (message !== '') {
      socket.send(JSON.stringify({
        event_type: "chat",
        message: message
      }));
      setMessage('');
    }
  }

  const onLeaveRoom = () => {
    socket.send(JSON.stringify({
      event_type: "leave-room"
    }));
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
    }).then(() => onNavigateHome());
  }

  socket.onclose = () => {
    dispatch({
      type: ROOM_ACTIONS.RESET_ROOM
    });
    dispatch({
      type: SOCKET_ACTIONS.REMOVE_SOCKET
    });
    dispatch({
      type: PLAYER_ACTIONS.RESET_HAND,
    });
    dispatch({
      type: PLAYER_ACTIONS.RESET_ADMIN,
    });
    dispatch({
      type: PLAYER_ACTIONS.SET_DEAD,
    });
    onNavigateHome()
    // Swal.fire({
    //   icon: 'warning',
    //   title: 'Connection lost :('
    // }).then(() => onNavigateHome());
  }

  socket.onmessage = (ev) => {
    const data = JSON.parse(ev.data);
    console.log(data);

    switch (data.event_type) {
      case "message-broadcast":
        setChats([...chats, data])
        break;
      case "join-room-broadcast":
        console.log(`new player id: ${data.new_player.id_player}`);
        console.log(`player id: ${playerId}`);
        const joinLog: Chat = {
          message: `${data.new_player.name} joined`,
          sender: 'system'
        }
        setChats([...chats, joinLog])
        if (data.new_player.id_player !== playerId) {
          dispatch({
            type: ROOM_ACTIONS.ADD_PLAYER,
            payload: data.new_player
          });
        }
        break;
      case "leave-room":
        socket.close(1000)
        dispatch({
          type: ROOM_ACTIONS.RESET_ROOM
        });
        dispatch({
          type: SOCKET_ACTIONS.REMOVE_SOCKET
        });
        dispatch({
          type: PLAYER_ACTIONS.RESET_HAND
        });
        dispatch({
          type: GAME_ACTIONS.RESET
        })
        onNavigateHome();
        break;
      case "leave-room-broadcast":
        console.log('leave room broadcast');
        const leaveLog: Chat = {
          message: `${data.id_leaving_player} left`,
          sender: 'system'
        }
        setChats([...chats, leaveLog])
        dispatch({
          type: ROOM_ACTIONS.REMOVE_PLAYER,
          payload: data.id_leaving_player
        })
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
        dispatch({
          type: ROOM_ACTIONS.SET_TURN,
          payload: data.starter_idx,
        })
        break;
      case "end-game-broadcast":
        dispatch({
          type: ROOM_ACTIONS.END_GAME
        });
        dispatch({
          type: ROOM_ACTIONS.SET_LAST_CARD,
          payload: {} as Card,
        })
        dispatch({
          type: PLAYER_ACTIONS.RESET_HAND
        });
        dispatch({
          type: PLAYER_ACTIONS.SET_DEAD
        });
        const endLog: Chat = {
          sender: 'System',
          message: `${data.id_winner} win!`
        }
        setChats([...chats, endLog]);
        Swal.fire({
          icon: 'info',
          text: `${data.id_winner} win!`
        })
        break;
      case "play-card":
        if (data.is_update) {
          dispatch({
            type: PLAYER_ACTIONS.SET_HAND,
            payload: data.new_hand
          });
        }
        // if (!data.success) {
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'Invalid move',
        //     text: data.is_update ? 'Hand discarded' : ''
        //   })
        // }
        if (data.status === 1) {
          Swal.fire({
            icon: 'error',
            'title': 'Unplayable card',
            'text': data.message,
            showConfirmButton: false,
            showDenyButton: true,
            showCancelButton: true,
            denyButtonText: 'Discard',
          }).then((result) => {
            if (result.isDenied) {
              socket.send(JSON.stringify({
                event_type: "play-card",
                hand_index: data.hand_index,
                is_discard: true,
              }))
            }
          })
        } else if (data.status === 2) {
          Swal.fire({
            icon: 'info',
            'title': 'Hand discarded',
          })
        } else if (data.status === 3) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid move',
            text: data.message
          })
        }
        break;
      case "play-card-broadcast":
        dispatch({
          type: ROOM_ACTIONS.SET_COUNT,
          payload: data.count
        });
        dispatch({
          type: ROOM_ACTIONS.SET_TURN,
          payload: data.next_player_idx
        })
        if (data.card.rank !== 0) {
          dispatch({
            type: ROOM_ACTIONS.SET_LAST_CARD,
            payload: data.card
          });
        }
        break;
      case "turn-broadcast":
        break;
      case "initial-hand":
        dispatch({
          type: PLAYER_ACTIONS.SET_HAND,
          payload: data.new_hand,
        });
        break;
      case "dead-player":
        dispatch({
          type: ROOM_ACTIONS.KILL_PLAYER,
          payload: data.id_dead_player
        });
        const deadLog: Chat = {
          message: `${data.id_dead_player} is dead`,
          sender: 'system'
        }
        setChats([...chats, deadLog]);
        break;
      case "notification-broadcast":
        Swal.fire({
          icon: 'info',
          text: data.message
        });
        const notifLog: Chat = {
          sender: 'System',
          message: data.message
        }

        setChats([...chats, notifLog]);
        break;
      case "change-host":
        if (data.id_new_host === playerId) {
          dispatch({
            type: PLAYER_ACTIONS.SET_ADMIN
          });
        }
        const newAdminLog: Chat = {
          sender: 'System',
          message: `user ${data.id_new_host} is now admin`
        }
        setChats([...chats, newAdminLog]);
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
                disabled={isStarted}
              >
                Start
              </Button>
              : ''
          }
          <CopyToClipboard
            text={window.location.href}
            onCopy={() => Swal.fire({
              icon: 'success',
              title: 'Link copied',
              text: window.location.href
            })}
          >
            <Button
              variant="contained"
              fullWidth
              color="default"
            >
              Copy link
            </Button>
          </CopyToClipboard>
          <Button
            onClick={() => onLeaveRoom()}
            variant="contained"
            fullWidth
            color="secondary"
          // disabled={isStarted}
          >
            Leave
          </Button>
        </Grid>
        <Grid
          className={styles.table}
          item
          container
          direction="column"
          alignItems="center"
          xs={6}
        >
          <Backdrop open={isChoosing}>

          </Backdrop>
          <PlayerCard
            players={players}
          />
          <Grid
            className={styles.card}
          >
            <img
              alt={`${lastCard.rank} of ${PATTERNS[lastCard.pattern]}`}
              src={
                lastCard.rank !== undefined
                  ? '/cards/' + lastCard.rank + '_of_' + PATTERNS[lastCard.pattern] + '.png'
                  : '/cards/back.png'
              }
              style={{
                maxWidth: '100%'
              }}
            />
          </Grid>
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSend()
              }
            }}
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

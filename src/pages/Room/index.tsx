import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useHistory } from 'react-router';
import Swal from 'sweetalert2';
import useSound from 'use-sound';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ClockwiseRotate from '@material-ui/icons/Autorenew';
import CounterClockwiseRotate from '@material-ui/icons/Loop';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useStyles } from './style';
import { Card, Chat, PATTERNS, Player } from '../../types';
import ChatCard from '../../components/ChatCard';
import HandCard from '../../components/HandCard';
import PlayerCard from '../../components/PlayerCard';
import CounterPad from '../../components/CounterPad';
import { RootState } from '../../redux/reducers/rootReducer';
import { ACTIONS as GAME_ACTIONS } from '../../redux/reducers/gameReducer';
import { ACTIONS as ROOM_ACTIONS } from '../../redux/reducers/roomReducer';
import { ACTIONS as PLAYER_ACTIONS } from '../../redux/reducers/playerReducer';
import { ACTIONS as SOCKET_ACTIONS } from '../../redux/reducers/socketReducer';
import dealCardSfx from '../../sfx/zapsplat_leisure_playing_cards_flick_through_shuffle_007_62510.mp3';
import playCardSfx from '../../sfx/zapsplat_leisure_playing_cards_several_set_down_001_65941.mp3';
import notificationSfx from '../../sfx/zapsplat_multimedia_game_sound_brick_set_down_003_67449.mp3';
import dropCardSfx from '../../sfx/zapsplat_impact_hit_hard_broken_glass_short_slam_001_63097.mp3';

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
  const [playDealCard] = useSound(dealCardSfx);
  const [playPlayCard] = useSound(playCardSfx);
  const [playNotification] = useSound(notificationSfx);
  const [playDropCard] = useSound(dropCardSfx);

  const {
    name,
    hand,
    id_player: playerId,
    is_admin: isAdmin,
    avatar_url: avatarUrl,
  } = useSelector((state: RootState) => state.playerReducer);
  const {
    players,
    last_card: lastCard,
    is_started: isStarted,
    is_clockwise: isClockwise,
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

  useEffect(() => {
    const chatBase = document.getElementById('chat-base');
    if (chatBase) {
      chatBase.scrollIntoView();
    }
  }, [chats]);

  const onNavigateHome = () => {
    history.push('/');
  }

  const onStartGame = () => {
    socket.send(JSON.stringify({
      event_type: "start-game"
    }))
  }

  const onSend = () => {
    let content = message.trim();
    if (content !== '') {
      socket.send(JSON.stringify({
        event_type: "chat",
        message: content
      }));
    }
    setMessage('');
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
  }

  socket.onmessage = (ev) => {
    const data = JSON.parse(ev.data);
    console.log(data);

    switch (data.event_type) {
      case "message-broadcast":
        playNotification();
        setChats([...chats, data])
        break;
      case "join-room-broadcast":
        playNotification();
        console.log(`new player id: ${data.new_player.id_player}`);
        console.log(`player id: ${playerId}`);
        const joinLog: Chat = {
          message: `${data.new_player.name} joined`,
          sender: 'System'
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
        // socket.close(1000)
        // playNotification();
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
        playNotification();
        console.log('leave room broadcast');
        const leavingPlayer = players.find(
          (p: Player) => p.id_player === data.id_leaving_player);

        let leavingPlayerName = data.id_leaving_player;
        if (leavingPlayer !== undefined) {
          leavingPlayerName = leavingPlayer.name;
        }
        const leaveLog: Chat = {
          message: `${leavingPlayerName} left`,
          sender: 'System'
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
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Failed to start game'
          })
        }
        break;
      case "start-game-broadcast":
        playDealCard();
        dispatch({
          type: ROOM_ACTIONS.SET_START
        });
        dispatch({
          type: ROOM_ACTIONS.SET_TURN,
          payload: data.starter_idx,
        })
        break;
      case "end-game-broadcast":
        playNotification();
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
        const winner = players.find(
          (p: Player) => p.id_player === data.id_winner);

        let winnerName = data.id_winner;
        if (winner !== undefined) {
          winnerName = winner.name
        }
        const endLog: Chat = {
          sender: 'System',
          message: `${winnerName} win!`
        }
        setChats([...chats, endLog]);
        Swal.fire({
          icon: 'info',
          text: `${winnerName} win!`
        })
        break;
      case "play-card":
        if (data.is_update) {
          dispatch({
            type: PLAYER_ACTIONS.SET_HAND,
            payload: data.new_hand
          });
        }
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
            } else if (result.isDismissed) {
              dispatch({
                type: GAME_ACTIONS.SET_NOT_CHOOSING
              })
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
          playPlayCard();
          dispatch({
            type: ROOM_ACTIONS.SET_LAST_CARD,
            payload: data.card
          });
        } else {
          playDropCard();
        }
        if (data.is_clockwise !== isClockwise) {
          dispatch({
            type: ROOM_ACTIONS.SET_REVERSE
          })
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
        const deadPlayer = players.find(
          (p: Player) => p.id_player === data.id_dead_player);

        let deadName = data.id_dead_player;
        if (deadPlayer !== undefined) {
          deadName = deadPlayer.name
        }
        const deadLog: Chat = {
          message: `${deadName} is dead`,
          sender: 'System'
        }
        setChats([...chats, deadLog]);
        break;
      case "notification-broadcast":
        playNotification();
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
        playNotification();
        if (data.id_new_host === playerId) {
          dispatch({
            type: PLAYER_ACTIONS.SET_ADMIN
          });
        }
        const newHost = players.find(
          (p: Player) => p.id_player === data.id_new_host);

        let hostName = data.id_new_host;
        if (newHost !== undefined) {
          hostName = newHost.name
        }
        const newAdminLog: Chat = {
          sender: 'System',
          message: `user ${hostName} is now admin`
        }
        setChats([...chats, newAdminLog]);
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
          <Typography style={{ color: 'white' }}>
            {name}
          </Typography>
          <HandCard
            cards={hand}
          />
          <Grid
            item
            container
            direction="row"
            alignItems="center"
            alignContent="center"
            justify="center"
          >
            <IconButton className={styles.control} onClick={() => onLeaveRoom()}>
              <ExitToAppIcon fontSize="large" style={{ color: 'white' }} />
            </IconButton>
            <CopyToClipboard
              text={window.location.href}
              onCopy={() => Swal.fire({
                icon: 'success',
                title: 'Link copied',
                text: window.location.href
              })}
            >
              <IconButton className={styles.control}>
                <FileCopyIcon fontSize="large" style={{ color: 'white' }} />
              </IconButton>
            </CopyToClipboard>
            {
              isAdmin
                ? <IconButton className={styles.control} disabled={isStarted} onClick={() => onStartGame()}>
                  <PlayArrowIcon fontSize="large" style={{ color: 'white' }} />
                </IconButton>
                : ''
            }
          </Grid>
        </Grid>
        <Grid
          className={styles.mid}
          item
          container
          direction="column"
          alignItems="center"
          xs={6}
        >
          <Grid
            item
            container
            className={styles.table}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Backdrop open={isChoosing} classes={{ root: styles.roomBackdrop }}>Pick a player</Backdrop>
            <PlayerCard players={players} />
            <CounterPad />
          </Grid>
          <Grid
            item
            container
            className={styles.lastPlayedDisplay}
            justify="center"
            alignItems="center"
          >
            {isClockwise
              ? <ClockwiseRotate fontSize="large" style={{ color: 'white' }} />
              : <CounterClockwiseRotate fontSize="large" style={{ color: 'white' }} />
            }
            <Grid className={styles.card}>
              <img
                alt={`${lastCard.rank} of ${PATTERNS[lastCard.pattern]}`}
                src={
                  lastCard.rank !== undefined
                    ? '/cards/' + lastCard.rank + '_of_' + PATTERNS[lastCard.pattern] + '.png'
                    : '/cards/back.png'
                }
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%'
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          className={styles.chat}
          item
          container
          direction="column"
          alignItems="center"
          justify="center"
          xs={3}
        >
          <ChatCard chats={chats} />
          <TextField
            className={styles.form}
            name="Message"
            variant="outlined"
            fullWidth
            id="message"
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSend()
              }
            }}
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
        </Grid>
      </Grid>
    </>
  );
}

export default Room;

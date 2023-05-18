import React from 'react';
import { useSelector } from 'react-redux';
import { Drawer, SwipeableDrawer, Grid, IconButton, Tooltip, Avatar, Typography } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Swal from 'sweetalert2';

import { RootState } from '../../redux/reducers/rootReducer';
import { useStyles } from './style';

interface Prop {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onStartGame: () => void;
  onLeaveRoom: () => void;
  onShowLeaderboard: () => void;
  onChooseVKTarget: () => void;
}

const MenuDrawer = (properties: Prop) => {
  const { 
    show, 
    setShow, 
    onLeaveRoom,  
    onShowLeaderboard,
    onStartGame,
    onChooseVKTarget,
  } = properties;

  const {
    name,
    avatar_url: avatarUrl,
    is_admin: isAdmin,
  } = useSelector((state: RootState) => state.playerReducer);
  const {
    is_started: isStarted,
  } = useSelector((state: RootState) => state.roomReducer);

  const styles = useStyles();

  return (
    <SwipeableDrawer 
      anchor="left" 
      open={show} 
      onOpen={() => setShow(true)} 
      onClose={() => setShow(false)}
      disableSwipeToOpen={false}
      swipeAreaWidth={50}
    >
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        alignContent="center"
        // justify="center"
        className={styles.drawer}
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
        <Tooltip title="Leave">
          <IconButton className={styles.control} onClick={() => {setShow(false); onLeaveRoom()}}>
            <ExitToAppIcon fontSize="large" style={{ color: 'white' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Leaderboard">
          <IconButton className={styles.control} onClick={() => { setShow(false); onShowLeaderboard(); }}>
            <StarIcon fontSize="large" style={{ color: 'white' }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Copy link">
          <CopyToClipboard
            text={window.location.href}
            onCopy={() => {
              setShow(false);
              Swal.fire({
                icon: 'success',
                title: 'Link copied',
                text: window.location.href
              })
            }
            }
          >
            <IconButton className={styles.control}>
              <FileCopyIcon fontSize="large" style={{ color: 'white' }} />
            </IconButton>
          </CopyToClipboard>
        </Tooltip>
        <Tooltip title="Vote kick">
          <IconButton className={styles.control} onClick={() => { setShow(false); onChooseVKTarget() }}>
            <NotInterestedIcon fontSize="large" style={{ color: 'white' }} />
          </IconButton>
        </Tooltip>
        {
          isAdmin
            ? <Tooltip title="Start">
              <IconButton className={styles.control} disabled={isStarted} onClick={() => {setShow(false); onStartGame() }}>
                <PlayArrowIcon fontSize="large" style={{ color: 'white' }} />
              </IconButton>
            </Tooltip>
            : ''
        }
      </Grid>

    </SwipeableDrawer> 
  )
}

export default MenuDrawer;


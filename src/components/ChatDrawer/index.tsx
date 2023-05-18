import React from 'react';
// import { useSelector } from 'react-redux';
import { Drawer, SwipeableDrawer, Grid, IconButton, Tooltip } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import { RootState } from '../../redux/reducers/rootReducer';
import { useStyles } from './style';
import { Chat } from '../../types';
import ChatCard from '../ChatCard';

interface Prop {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  chats: Chat[];
  onSend: () => void;
}

const ChatDrawer = (properties: Prop) => {
  const { 
    show, 
    setShow, 
    chats,
    message,
    setMessage,
    onSend,
  } = properties;

  // const {
  //   is_admin: isAdmin,
  // } = useSelector((state: RootState) => state.playerReducer);
  // const {
  //   is_started: isStarted,
  // } = useSelector((state: RootState) => state.roomReducer);

  const styles = useStyles();

  return (
    // <Grid xs={3}>
    <SwipeableDrawer 
      // className={styles.drawer} 
      anchor="right" 
      open={show} 
      onOpen={() => setShow(true)} 
      onClose={() => setShow(false)}
      disableSwipeToOpen={false}
      swipeAreaWidth={20}
    >
      <Grid
        className={styles.chat}
        item
        container
        direction="column"
        // alignItems="center"
        // justify="center"
        // xs={10}
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
    </SwipeableDrawer>
    // </Grid>
     
  )
}

export default ChatDrawer;



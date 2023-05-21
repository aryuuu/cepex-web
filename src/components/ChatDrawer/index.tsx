import React from 'react';
import { SwipeableDrawer, Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

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

  const styles = useStyles();

  return (
    <SwipeableDrawer 
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
  )
}

export default ChatDrawer;



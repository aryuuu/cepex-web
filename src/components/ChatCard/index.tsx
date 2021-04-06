import React from 'react';
import { Grid } from '@material-ui/core';
import { Chat } from '../../types';
import { useStyles } from './style';
import Typography from '@material-ui/core/Typography';

interface Prop {
  chats: Chat[]
}

const ChatCard = (properties: Prop) => {
  const { chats } = properties;
  const styles = useStyles();
  const renderChat = chats.map((item: Chat, index: number) => {
    return (
      <Grid
        className={styles.balloon}
        key={`chat-${index}`}
      >
        <Typography>{item.sender}</Typography>
        <Typography>{item.message}</Typography>
        {/* <p>{item.sender}</p>
        <p>{item.message}</p> */}
      </Grid>
    )
  });

  return (
    <Grid
      className={styles.chatCont}
      direction="column"
    >
      {renderChat}
    </Grid>
  )
}

export default ChatCard;

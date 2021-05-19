import React from 'react';
import { Grid, GridList } from '@material-ui/core';
import { Chat } from '../../types';
import { useStyles } from './style';

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
        <b>{item.sender} </b>{item.message}
      </Grid>
    )
  });

  return (
    <GridList
      className={styles.chatList}
      cols={1}
      cellHeight='auto'
    >
      {renderChat}
    </GridList>
  )
}

export default ChatCard;

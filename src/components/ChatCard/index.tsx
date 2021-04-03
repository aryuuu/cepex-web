import react from 'react';
import { Grid } from '@material-ui/core';
import { Chat } from '../../types';

interface Prop {
  chats: Chat[]
}

const ChatCard = (properties: Prop) => {
  const { chats } = properties;
  const renderChat = chats.map((item: Chat, index: number) => {
    return (
      <Grid
        key={`chat-${index}`}
      >
        <p>{item.sender}</p>
        <p>{item.message}</p>
      </Grid>
    )
  });

  return (
    <Grid>
      {renderChat}
    </Grid>
  )
}

export default ChatCard;

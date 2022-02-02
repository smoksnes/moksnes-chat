import { ListItem, Stack } from "@mui/material";
import { FC, ReactElement, useEffect, useState } from "react";
import { IChatMessage } from "../models/Chat";


interface IChatProps {
    chats: Array<IChatMessage> 
}

interface IChatState {
    msg: string,
    chats: Array<IChatMessage>
  }

const ChatComponent = (props: IChatProps) => {

    const items = props.chats.map((item, i) =>
    <ListItem key={i}>
        <span>{item.message}</span><span>{item.sender}</span>
    </ListItem>
  );
  
    return (
      <Stack spacing={2}>
            {items}
        </Stack>
    )
  }
export default ChatComponent;
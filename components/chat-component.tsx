import { ListItem, Stack } from "@mui/material";
import styles from '../styles/chat.module.scss'
import { FC, ReactElement, useEffect, useState } from "react";
import { IChatMessage } from "../models/Chat";


interface IChatProps {
    chats: Array<IChatMessage> 
}

const ChatComponent = (props: IChatProps) => {

    const items = props.chats.map((item, i) =>
    <div key={i}>
        <span className={styles.sender}>
          <span className={styles.name}>{item.sender} </span><span className={styles.typing}>skriver:</span>
        </span>
        <span className={styles.message}>{item.message}</span>
    </div>
  );
  
    return (
      <Stack spacing={2}>
            {items}
        </Stack>
    )
  }
export default ChatComponent;
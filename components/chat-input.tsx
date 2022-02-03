import {  Grid, TextField, Button} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import { IChatMessage } from "../models/Chat";


const ChatInput = () => {

    const [msg, setMsg] = useState<string>("");

    const sendMessage = async () => {
        if (msg) {
          const chatMsg: IChatMessage = {
            sender: "foo",
            message: msg,
          };
          // dispatch message to other users
          fetch("/api/chat", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(chatMsg),
          })
          .then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            setMsg("");
          })
        }
      };
    
      const handleClick = (event: React.MouseEvent) =>  {
        event.preventDefault();
        sendMessage();
      }
    
      const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setMsg(event.target.value);
      };
    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <TextField 
                    value={msg}
                    onChange={handleChange}
                    fullWidth 
                    placeholder={'Enter text'}
                    variant="standard"
                    />
            </Grid>
            <Grid item xs={4}>
                <Button variant="contained" endIcon={<SendIcon />} onClick={handleClick}>Outlined</Button>
            </Grid>
        </Grid>
    )
  }
export default ChatInput;
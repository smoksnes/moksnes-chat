import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { IChatMessage, ChatModel } from '../models/Chat';
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Button, Grid, TextField } from '@mui/material';
import { server } from '../config';
import ChatComponent from '../components/chat-component';
import SendIcon from '@mui/icons-material/Send';
import ChatInput from '../components/chat-input';

interface IHomeProps {
   chats: Array<IChatMessage>
}

interface IHomeState {
  msg: string,
  chats: Array<IChatMessage>
}

const Home = ({ chats }: IHomeProps) => {
  // connected flag
  const [connected, setConnected] = useState<boolean>(false);
  // // init chat and message
  const [chatMessages, setChat] = useState<IChatMessage[]>([]);
  


  useEffect(() => {
    setChat(chats);

    console.log('chats is ', chats);
    console.log('chatMessages is ', chatMessages);
    const socket = io({ path: "/api/socketio" });

    socket.on("connect", async () => {
       console.log("SOCKET CONNECTED!", socket.id);
       setConnected(true);
    });

    socket.on("message", (message: IChatMessage) => {
      console.log('Got message from socket');
      console.log(message);
      chats.push(message);
      setChat([...chats]);
    });

    socket.on("status", (message) => {
      console.log('Got status from socket');
      console.log(message);
    });

    socket.on("disconnect", () => {
       setConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);


  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      You are connected: {connected ? (<span>JA</span>) : (<span>Nej</span>)};
      <ChatComponent chats={chatMessages} />
      {/* {chatMessages.map((chat, i) => {     
           return (<div>{chat.message}</div>) 
        })} */}

      <div className={styles.chatbox}>
        <ChatInput></ChatInput>
      </div>
        </div>
  )
};

  export const getStaticProps = async () => {
    const url = server + '/api/chat';
    const response = await fetch(url);
    const model = await response.json();
    return {
        props: {
          chats: JSON.parse(JSON.stringify(model))
        },
    };
}

export default Home

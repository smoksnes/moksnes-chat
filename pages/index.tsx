import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { GetStaticPropsResult, GetStaticProps } from "next";
// import { IChat, connect, ChatModel } from '../models/Chat';
import { IChatMessage, ChatModel } from '../models/Chat';
import { connectToDatabase } from '../middleware/mongodb';
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Button, TextField } from '@mui/material';
// import { connect } from 'http2';

// import {ChatModel}from '../models/chat';
// import { IChat } from '../models/interfaces/chat';
// import IChat from '../models/chat'
// import ChatModel from '../models/chat';

interface IHomeProps {
   chats: Array<IChatMessage>
}

interface IHomeState {
  msg: string;
}


const Home: NextPage<IHomeProps, IHomeState> = (props) => {
  // constructor(props: IHomeProps) {
  //   super(props);

  //   this.state = {
  //     playOrPause: 'Play'
  //   };
  
  
  console.log('foo1')

  // connected flag
  const [connected, setConnected] = useState<boolean>(false);

  // init chat and message
  const [chat, setChat] = useState<IChatMessage[]>([]);
  const [msg, setMsg] = useState<string>("");

  useEffect((): any => {
    // connect to socket server
    console.log('foo2')
     const socket = io();
    //  const socket = io.connect('/api/socketio');
    // const socket = io(); //.connect(process.env.BASE_URL, {
    //   path: "",
    // });

    // log socket connection
    // socket.on("connect", () => {
    //   console.log("SOCKET CONNECTED!", socket.id);
    //   setConnected(true);
    // });

    // // update chat on new message dispatched
    // socket.on("message", (message: IChatMessage) => {
    //   chat.push(message);
    //   setChat([...chat]);
    // });

    // // socket disconnet onUnmount if exists
    // if (socket) return () => socket.disconnect();
  }, []);

  const sendMessage = async () => {
    if (msg) {
      // build message obj
      const chatMsg: IChatMessage = {
        sender: "foo",
        message: msg,
      };

      // dispatch message to other users
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatMsg),
      });

      // reset field if OK
      if (resp.ok) setMsg("");
    }

    // focus after click
    // inputRef?.current?.focus();
  };

  const handleClick = (event: React.MouseEvent) =>  {
    event.preventDefault();
    sendMessage();
  }

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setMsg(event.target.value);
    // this.setState({ value: e.target.value });
  };
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {props.chats.map((chat, i) => {     
           console.log("Entered");                 
           // Return the element. Also pass key     
           return (<span>{chat.message}</span>) 
        })}
<TextField 
          onChange={handleChange}
          placeholder={'Enter text'}
        />
        <Button variant="outlined" onClick={handleClick}>Outlined</Button>
        </div>
  )
}

export const getServerSideProps: IHomeProps = async (context: Promise<IHomeProps>) =>  {
  console.log('Connecting to DB.')
  await connectToDatabase();
  console.log('Get from DB.')
  const chats:Array<IChatMessage> = await (await ChatModel.find({  }));
  // const chats: Array<IChatMessage> = await ChatModel.find({  });
  console.log('Got from DB.')

  chats.forEach(el => {
    console.log(el.message);
  });
  console.log('Finished loading from DB.')
  var json = JSON.stringify(chats)

  // let result = ChatModel.find({}) as IChat[];
  return {
      props: {
        chats: JSON.parse(JSON.stringify(chats))
      },
  };
}


export default Home

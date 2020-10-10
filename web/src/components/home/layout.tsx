

import React, { useState, useEffect } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { SESSION } from "../../graphql/auth";
import Sidebar from "../home/Sidebar";
import { CHATROOMS } from "../../graphql/user";
import MakeNewRoom from "../home/MakeNewRoom";
import Chatroom from "../home/Chatroom";
import { NEW_ROOM_CREATED, NEW_MESSAGE_FOR_USER } from "../../graphql/messaging";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: "absolute",
    top: 64,
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: 0,
    bottom: 60,
    left: drawerWidth,
    right: 0,
  }
}));

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  const classes = useStyles();

  let history = useHistory();

  const { data: session } = useQuery(SESSION);
  const { loading, error, data, subscribeToMore } = useQuery(CHATROOMS);
  const { data: subData } = useSubscription(NEW_MESSAGE_FOR_USER);

  /* Effect hooks */
  useEffect(() => {
    if (!session.user.loading && !session.user.data) {
      history.replace("/login");
    }
  }, [session]);

  useEffect(() => {
    if (data?.chatrooms?.length <= 0) {
      history.replace("/new");
    }
  }, [data]);

  useEffect(() => {
    console.log(subData)
  }, [subData])

  function selectRoom(id: string) {
    history.push(`/room/${id}`);
  }

  function createRoom() {
    history.push("/new");
  }

  return (
    <div className={classes.root}>
      <Sidebar
        loading={loading}
        rooms={data?.chatrooms}
        makeNewRoom={() => createRoom()}
        selectRoom={selectRoom}
        subscribeToNewRooms={() => {
          return subscribeToMore({
            document: NEW_ROOM_CREATED,
            updateQuery: (prev, { subscriptionData }) => {
              if (!subscriptionData.data) return prev;

              const newRoomCreated = subscriptionData.data.newRoomCreated;
              return {
                chatrooms: [newRoomCreated, ...prev.chatrooms],
              };
            }
          });
        }}
      />
      <div className={classes.content}>
        {children}
      </div>
    </div>
  )
}
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useQuery, useSubscription } from "@apollo/client";
import { SESSION } from "../../graphql/auth";
import Sidebar from "./Sidebar";
import { CHATROOMS } from "../../graphql/user";
import { NEW_ROOM_CREATED, NEW_MESSAGE_FOR_USER } from "../../graphql/messaging";
import useStyles from "../../styles/chatroom/layout";

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  const classes = useStyles();

  let history = useHistory();

  const { data: session } = useQuery(SESSION);
  const { loading, data, subscribeToMore } = useQuery(CHATROOMS);

  // Subscription hook will automatically update Apollo cache in this case
  useSubscription(NEW_MESSAGE_FOR_USER);

  /* Effect hooks */
  useEffect(() => {
    if (!session.user.loading && !session.user.data) {
      history.replace("/login");
    }
  }, [session, history]);

  useEffect(() => {
    if (data?.chatrooms?.length <= 0) {
      history.replace("/new");
    }
  }, [data, history]);

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
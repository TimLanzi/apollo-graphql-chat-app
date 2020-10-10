import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { SESSION } from "../graphql/auth";
import Sidebar from "../components/home/Sidebar";
import { CHATROOMS } from "../graphql/user";
import MakeNewRoom from "../components/home/MakeNewRoom";
import Chatroom from "../components/home/Chatroom";
import { NEW_ROOM_CREATED } from "../graphql/messaging";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: "absolute",
    top: 64,
    bottom: 0,
    left: 0,
    right: 0,
    // flexDirection: "column"
    // maxWidth: "100%",
    // maxHeight: "100%",
  },
  content: {
    // flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: 0,
    bottom: 60,
    left: drawerWidth,
    right: 0,
    // maxWidth: "100%",
    // maxHeight: "calc(100% - 14em)",
    // width: `calc(100% - ${drawerWidth}px)`,
    // padding: theme.spacing(3)
  }
}));

export default function HomePage() {
  const classes = useStyles();

  let history = useHistory();

  const { data: session } = useQuery(SESSION);
  const { loading, error, data, subscribeToMore } = useQuery(CHATROOMS);

  /* State hooks */
  const [selectedRoom, setSelectedRoom] = useState("");
  const [newRoom, setNewRoom] = useState(false);

  /* Effect hooks */
  useEffect(() => {
    if (!session.user.loading && !session.user.data) {
      history.replace("/login");
    }
  }, [session]);

  useEffect(() => {
    if (data?.chatrooms?.length > 0) {
      setNewRoom(false);
      setSelectedRoom(data.chatrooms[0].id);
    } else {
      setNewRoom(true);
      setSelectedRoom("");
    }
  }, [data]);

  // useEffect(() => {
  //   console.log("hello")
  //   const unsubscribe = subscribeToMore({
  //     document: NEW_ROOM_SUB,
  //     updateQuery: (prev, { subscriptionData }) => {
  //       console.log(subscriptionData)
  //       if (!subscriptionData.data) return prev;

  //       const newRoomCreated = subscriptionData.data.newRoomCreated;
  //       console.log(prev)
  //       return [newRoomCreated, ...prev];
  //     }
  //   });

  //   return unsubscribe();
  // }, [subscribeToMore]);

  function setToCreatedRoom(id: string) {
    console.log(id);
    setNewRoom(false);
    setSelectedRoom(id);
  }
useEffect(() => {
  console.log(`Update: ${selectedRoom}`)
}, [selectedRoom])
  function selectRoom(id: string) {
    setNewRoom(false);
    setSelectedRoom(id);
  }

  function createRoom() {
    setNewRoom(true);
    setSelectedRoom("");
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
        {/* Message feed */}
        { newRoom &&
          <MakeNewRoom setRoom={setToCreatedRoom} />
        }
        { selectedRoom &&
          <Chatroom id={selectedRoom} />
        }
      </div>
    </div>
  )
}
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { CircularProgress, makeStyles } from "@material-ui/core";
import { CHATROOM, SEND_MESSAGE, NEW_MESSAGE_IN_ROOM, MARK_CHATROOM_MESSAGES_READ } from "../../graphql/messaging";
import MessageInput from "./MessageInput";
import MessageFeed from "./MessageFeed";


const useStyles = makeStyles(theme => ({
  root: {
    // width: "100%",
    minHeight: 0,
    flexGrow: 1,
    display: "flex",
    flexDirection: "column"
  },
  progress: {
    position: "fixed",
    top: "50%",
    right: "35%",
  }
}))

interface Props {
  id: string;
}

export default function Chatroom({ id }: Props) {
  const classes = useStyles();

  const { loading, error, data } = useQuery(CHATROOM, { variables: { id }});
  const { data: subData } = useSubscription(NEW_MESSAGE_IN_ROOM, { variables: { rid: id }});

  const [send, {/* loading: mLoading, error: mErr, data: mData */}] = useMutation(SEND_MESSAGE, {
    update: (cache, { data: { createMessage }}) => {
      cache.modify({
        id: cache.identify(data?.chatroom),
        fields: {
          messages(existing) {
            const newRef = cache.writeFragment({
              data: createMessage,
              fragment: gql`
                fragment NewMessage on Message {
                  id
                  sender {
                    id
                    username
                  }
                  timestamp
                  content
                }
              `
            });

            return [...existing, newRef];
          }
        }
      })
    }
  });
  
  const [markRead] = useMutation(MARK_CHATROOM_MESSAGES_READ);

  const [message, setMessage] = useState("");
  // const [feed, setFeed] = useState<any[]>([])

  useEffect(() => {
    markRead({ variables: { rid: id }});
  }, [id]);

  // useEffect(() => {
  //   if (!loading) {
  //     if (error) {
  //       // TODO
  //     } else if (data) {
  //       // console.log("hello")
  //       // console.log(data.chatroom)
  //       setFeed(data.chatroom.messages);
  //     }
  //   }
  // }, [loading, error, data]);

  // useEffect(() => {
  //   console.log(feed)
  // }, [feed])

  useEffect(() => {
    if (subData) {
      // const exists = feed.find((item: any) => item.id === subData.newMessageInRoom.id);
      // if (!exists) {
      //   setFeed(prev => [
      //     ...prev,
      //     subData.newMessageInRoom,
      //   ]);
        markRead({ variables: { rid: id }});
      // }
    }
  }, [subData])

  function onChange(e: ChangeEvent<HTMLInputElement>): void {
    setMessage(e.target.value);
  }

  function sendMessage(e: FormEvent): void {
    e.preventDefault();

    send({ variables: {
      rid: id,
      msg: message,
    }});
    setMessage("");
  }

  return (
    <div className={classes.root}>
      { loading
        ? <CircularProgress className={classes.progress} />
      : data?.chatroom &&
        <MessageFeed chatroom={id} messages={data.chatroom.messages} />
      }
      <MessageInput message={message} onChange={onChange} onSubmit={sendMessage} />
    </div>
  )
}
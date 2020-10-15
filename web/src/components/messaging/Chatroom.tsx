import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { CircularProgress } from "@material-ui/core";
import { CHATROOM, SEND_MESSAGE, NEW_MESSAGE_IN_ROOM, MARK_CHATROOM_MESSAGES_READ } from "../../graphql/messaging";
import MessageInput from "./MessageInput";
import MessageFeed from "./MessageFeed";
import useStyles from "../../styles/chatroom";

interface Props {
  id: string;
}

export default function Chatroom({ id }: Props) {
  const classes = useStyles();

  const { loading, data, subscribeToMore } = useQuery(CHATROOM, { variables: { id }});
  // const { data: subData } = useSubscription(NEW_MESSAGE_IN_ROOM, { variables: { rid: id }});

  const [send] = useMutation(SEND_MESSAGE, {
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

  useEffect(() => {
    markRead({ variables: { rid: id }});
  }, [id, markRead]);

  useEffect(() => {
    if (data) {
      markRead({ variables: { rid: id }});
    }
  }, [data, id, markRead]);

  // useEffect(() => {
  //   if (subData) {
  //     markRead({ variables: { rid: id }});
  //   }
  // }, [subData, id, markRead]);

  useEffect(() => {
    return subscribeToMore({
      document: NEW_MESSAGE_IN_ROOM,
      variables: { rid: id },
      // updateQuery: (prev, { subscriptionData }) => {}
    })
  })

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
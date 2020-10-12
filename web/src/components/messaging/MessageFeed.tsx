import React, { useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Message from "./Message";

const useStyles = makeStyles(theme => ({
  messageFeed: {
    display: "flex",
    // flex: 1,
    flexGrow: 1,
    // width: "100%",
    padding: "1em",
    flexDirection: "column",
    overflow: "auto",
    // maxHeight: "50%",
    minHeight: 0,
  }
}))

interface Props {
  messages: any[];
}

export default function MessageFeed({ messages }: Props) {
  const classes = useStyles();

  const containerRef = useRef(null);

  useEffect(() => {
    scrollToBottom()
  }, [messages]);

  function scrollToBottom() {
    (containerRef.current as any).scrollTop = (containerRef.current as any).scrollHeight;
  }

  return (
    <div className={classes.messageFeed} ref={containerRef}>
      {messages.map(item => (
        <Message key={item.id} message={item} />
      ))}
    </div>
  )
}
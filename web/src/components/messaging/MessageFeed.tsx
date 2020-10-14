import React, { useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { groupByDay } from "../../helpers/groupMessages";
import DayGroup from "./DayGroup";

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
    "& :first-child": {
      marginTop: "auto",
    }
  }
}))

interface Props {
  chatroom: string;
  messages: any[];
}

export default function MessageFeed({ chatroom, messages }: Props) {
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
      {groupByDay(messages).map(item => (
        <DayGroup key={`${chatroom}:${item.day}`} day={item.day} messages={item.messages} />
      ))}
    </div>
  )
}
import React, { useRef, useEffect } from "react";
import { groupByDay } from "../../helpers/groupMessages";
import DayGroup from "./DayGroup";
import useStyles from "../../styles/chatroom/messageFeed";

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
import React from "react";
import Message from "./Message";
import useStyles from "../../styles/chatroom/minuteGroup";

interface Props {
  minute: string;
  messages: any[];
}

export default function MinuteGroup({ minute, messages }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.minuteGroup}>
      { messages.map((item, i) => (
        <Message
          key={`${item.id}:${minute}`}
          message={item}
          minute={(i === messages.length - 1) ? minute : undefined}
        />
      ))}
    </div>
  )
}
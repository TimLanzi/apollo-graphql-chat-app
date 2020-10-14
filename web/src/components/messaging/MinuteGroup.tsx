import React from "react";
import { makeStyles } from "@material-ui/core";
import Message from "./Message";

const useStyles = makeStyles(theme => ({
  minuteGroup: {
    display: "flex",
    flexDirection: "column",
    padding: "0.5em 0"
  },
  minute: {
    color: "#888"
  }
}));

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
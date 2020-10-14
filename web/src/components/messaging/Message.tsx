import React from "react";
import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import { makeStyles } from "@material-ui/core";
import { SESSION } from "../../graphql/auth";

const useStyles = makeStyles(theme => ({
  message: {
    // display: "flex",
    // width: "80%",
    // maxWidth: "80%",
    marginTop: "0.2em",
    marginLeft: "1em",
    marginRight: "1em",
    textAlign: "left",
    padding: "1em",
    borderRadius: "500em",
    boxShadow: "0 2px 6px 2px #b2b2b2",
    overflowWrap: "anywhere"
    // fontSize: "1em",
  },
  mine: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    // justifyContent: "right"
    marginLeft: "auto",
    // justifySelf: "right",
    // flexDirection: "row-reverse"
  },
  them: {
    backgroundColor: "#ddd",
    color: "#000",
    marginRight: "auto"
  },
  minute: {
    color: "#888"
  },
  meWrap: {
    position: "relative",
    marginLeft: "auto",
  },
  themWrap: {
    position: "relative",
    marginRight: "auto",
  },
  meTime: {
    position: "absolute",
    top: "45%",
    left: "-5.4em",
  },
  themTime: {
    position: "absolute",
    top: "45%",
    right: "-5.4em",
  },
}))

interface Props {
  message: any;
  minute?: string;
}

export default function Message({ message, minute }: Props) {
  const classes = useStyles();

  const { data: session } = useQuery(SESSION);

  if (minute) {
    return (
      <div className={message.sender.id === session.user.data.id ? classes.meWrap : classes.themWrap}>
        <div className={`${classes.message} ${message.sender.id === session.user.data.id ? classes.mine : classes.them}`}>
          {message.content}
        </div>
        <span className={`${classes.minute} ${message.sender.id === session.user.data.id ? classes.meTime : classes.themTime}`}>
          {format(new Date(minute), "h:mm a")}
        </span>
      </div>
    );
  }

  return (
    <div className={`${classes.message} ${message.sender.id === session.user.data.id ? classes.mine : classes.them}`}>
      {message.content}
    </div>
  );
}
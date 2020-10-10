import React from "react";
import { makeStyles } from "@material-ui/core";
import { SESSION } from "../../graphql/auth";
import { useQuery } from "@apollo/client";

const useStyles = makeStyles(theme => ({
  message: {
    display: "flex",
    // width: "80%",
    maxwidth: "80%",
    marginTop: "1em",
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
  }
}))

interface Props {
  message: any;
}

export default function Message({ message }: Props) {
  const classes = useStyles();

  const { data: session } = useQuery(SESSION);

  return (
    <div className={`${classes.message} ${message.sender.id === session.user.data.id ? classes.mine : classes.them}`}>
      {message.content}
    </div>
  )
}
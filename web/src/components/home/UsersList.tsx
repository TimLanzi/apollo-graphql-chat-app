import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Chip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",

    width: "100%",
    backgroundColor: "#fff",
    padding: "1em",
  },
  chip: {
    paddingRight: "1em",
  },
}))

interface Props {
  users: {id: string, username: string}[];
  remove: (index: number) => void;
}

export default function UsersList({ users, remove }: Props) {
  const classes = useStyles();

  if (!users || users.length < 1) return null;

  return (
    <div className={classes.root}>
      {users.map((item, i) => (
        <Chip
          key={item.id}
          style={{ marginRight: "1em" }}
          avatar={<Avatar>{item.username[0]}</Avatar>}
          label={item.username}
          color="primary"
          onDelete={() => remove(i)}
        />
      ))}
    </div>
  )
}
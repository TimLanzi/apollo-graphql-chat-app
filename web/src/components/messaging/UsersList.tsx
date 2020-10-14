import React from "react";
import { Avatar, Chip } from "@material-ui/core";
import useStyles from "../../styles/newRoom/usersList";

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
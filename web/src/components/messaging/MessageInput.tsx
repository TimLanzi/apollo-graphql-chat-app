import React, { ChangeEvent, FormEvent } from "react";
import { IconButton, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    // right: 0,
    bottom: 0,
    padding: "1em",
    backgroundColor: "#fff",
    // left: 0,
    display: "flex",
    // width: "100%"
    width: `calc(100% - ${drawerWidth}px)`,
  },
  input: {
    paddingRight: "0.5em"
  },
  sendButton: {
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
    paddingTop: 0,
    paddingBottom: 0,
  }
}));

interface Props {
  message: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent) => void;
}

export default function MessageInput({ message, onChange, onSubmit }: Props) {
  const styles = useStyles();

  return (
    <form id="message-input" className={styles.root} noValidate autoComplete="off" onSubmit={onSubmit}>
      <TextField
        fullWidth
        className={styles.input}
        placeholder="Message"
        value={message}
        onChange={onChange}
      />
      <IconButton className={styles.sendButton} type="submit">
        <SendIcon />
      </IconButton>
    </form>
  )
}
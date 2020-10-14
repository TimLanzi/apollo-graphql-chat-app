import React, { ChangeEvent, FormEvent } from "react";
import { IconButton, TextField } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import useStyles from "../../styles/chatroom/messageInput";

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
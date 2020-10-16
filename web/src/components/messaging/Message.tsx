import React, { memo } from "react";
import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import { SESSION } from "../../graphql/auth";
import useStyles from "../../styles/chatroom/message";

interface Props {
  message: any;
  minute?: string;
}

function Message({ message, minute }: Props) {
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

export default memo(Message);
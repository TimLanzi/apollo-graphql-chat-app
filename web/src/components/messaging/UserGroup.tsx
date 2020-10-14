import React from "react";
import { Avatar } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { SESSION } from "../../graphql/auth";
import { groupByMinute } from "../../helpers/groupMessages";
import MinuteGroup from "./MinuteGroup";
import useStyles from "../../styles/chatroom/userGroup";

interface Props {
  messages: any[];
  user: string;
}

export default function UserGroup({ user, messages }: Props) {
  const classes = useStyles();

  const { data: session } = useQuery(SESSION);

  return (
    <div className={classes.userGroup}>
      { groupByMinute(messages).map((item, i) => (
        <div className={`${classes.wrap} ${user === session.user.data.id ? classes.me : classes.them}`}>
          <div className={classes.avatarWrap}>
            <Avatar className={classes.messageAvatar}>t</Avatar>
          </div>
          <div className={classes.groupWrap}>
            <MinuteGroup key={`${user}:${item.minute}:${i}`} minute={item.minute} messages={item.messages} />
          </div>
        </div>
      ))}
    </div>
  )
}
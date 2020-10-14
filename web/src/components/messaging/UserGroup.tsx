import React from "react";
import { Avatar, makeStyles } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { SESSION } from "../../graphql/auth";
import { groupByMinute } from "../../helpers/groupMessages";
import MinuteGroup from "./MinuteGroup";

const useStyles = makeStyles(theme => ({
  userGroup: {
    display: "flex",
    padding: "1em 0",
    flexDirection: "column",
  },
  wrap: {
    display: "flex",
  },
  them: {
    // display: "flex",
    flexDirection: "row"
  },
  me: {
    // display: "flex",
    flexDirection: "row-reverse",
  },
  messageAvatar: {
    marginTop: "0.8em"
  },
  avatarWrap: {
    maxWidth: 40,
    flex: 1,
  },
  groupWrap: {
    flex: 1,
  },
}));

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
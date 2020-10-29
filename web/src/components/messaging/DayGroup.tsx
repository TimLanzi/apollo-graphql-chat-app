import React from "react";
import { useQuery } from "@apollo/client"
import { format } from "date-fns";
import { Divider, List, Typography, Avatar } from "@material-ui/core";
import Message from "./Message";
import { groupAndSort } from "../../helpers/groupMessages";
import { SESSION } from "../../graphql/auth";
import useStyles from "../../styles/chatroom/dayGroup";

interface Props {
  messages: any[];
  day: string;
}

export default function DayGroup({ day, messages }: Props) {
  const classes = useStyles();

  const { data: session } = useQuery(SESSION);

  return (
    <div className={classes.dayGroup}>
      <List>
        <Divider component="li" />
        <li>
          <Typography
            className={classes.dividerText}
            color="textSecondary"
            display="block"
            variant="caption"
          >
            {format(new Date(day), "EEE, MMM d, y")}
          </Typography>
        </li>
      </List>
      { groupAndSort(messages).map((item, i) => (
        <div
          key={`group-${item.sender}-${item.minute}-${i}`}
          className={classes.userGroup}
        >
          <div
            className={`${classes.wrap} ${item.sender === session.user.data.id ? classes.me : classes.them}`}
          >
            <div className={classes.avatarWrap}>
              <Avatar className={classes.messageAvatar}>
                { (item.messages.length > 0) && item.messages[0].sender.username[0] }
              </Avatar>
            </div>
            <div className={classes.groupWrap}>
              { item.messages.map((msg, i) => (
                <Message
                  key={`${msg.id}:${item.minute}`}
                  message={msg}
                  minute={(i === item.messages.length - 1) ? item.minute : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
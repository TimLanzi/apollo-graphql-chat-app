import React from "react";
import { format } from "date-fns";
import { Divider, List, Typography } from "@material-ui/core";
import { groupByMinute } from "../../helpers/groupMessages";
// import UserGroup from "./UserGroup";
import useStyles from "../../styles/chatroom/dayGroup";
import MinuteGroup from "./MinuteGroup";

interface Props {
  messages: any[];
  day: string;
}

export default function DayGroup({ day, messages }: Props) {
  const classes = useStyles();

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
      { groupByMinute(messages).map((item, i) => (
        <MinuteGroup key={`minutegroup-${item.messages[0].sender.id}:${i}}`} minute={item.minute} messages={item.messages} />
      ))}
      {/* { groupByUser(messages).map((item, i) => (
        <UserGroup key={`${item.messages[0].sender.id}:${i}`} user={item.sender} messages={item.messages} />
      ))} */}
    </div>
  )
}
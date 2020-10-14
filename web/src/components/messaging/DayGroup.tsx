import React from "react";
import { format } from "date-fns";
import { Divider, List, makeStyles, Typography } from "@material-ui/core";
import { groupByUser } from "../../helpers/groupMessages";
import UserGroup from "./UserGroup";

const useStyles = makeStyles(theme => ({
  dayGroup: {
    display: "flex",
    // flexGrow: 1,
    // marginTop: "auto",
    padding: "1em",
    flexDirection: "column",
  },
  dividerText: {
    marginTop: "0.5em"
  }
}));

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
      { groupByUser(messages).map((item, i) => (
        <UserGroup key={`${item.messages[0].sender.id}:${i}`} user={item.sender} messages={item.messages} />
      ))}
    </div>
  )
}
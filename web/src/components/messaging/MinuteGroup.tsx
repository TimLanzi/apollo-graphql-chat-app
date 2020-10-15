import React from "react";
// import Message from "./Message";
import useStyles from "../../styles/chatroom/minuteGroup";
import { groupByUser } from "../../helpers/groupMessages";
import UserGroup from "./UserGroup";

interface Props {
  minute: string;
  messages: any[];
}

export default function MinuteGroup({ minute, messages }: Props) {
  const classes = useStyles();

  return (
    <div className={classes.minuteGroup}>
      { groupByUser(messages).map((item, i) => (
        <UserGroup key={`usergroup-${item.messages[0].sender.id}:${minute}${i}`} user={item.sender} messages={item.messages} minute={minute} />
      ))}
    </div>
  )
}

// export function MinuteGroup({ minute, messages }: Props) {
//   const classes = useStyles();

//   return (
//     <div className={classes.minuteGroup}>
//       { [...messages].sort((a, b) => (a.timestamp > b.timestamp) ? -1 : 1).map((item, i) => (
//         <Message
//           key={`${item.id}:${minute}`}
//           message={item}
//           minute={(i === messages.length - 1) ? minute : undefined}
//         />
//       ))}
//     </div>
//   )
// }
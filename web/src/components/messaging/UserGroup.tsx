import React from "react";
import { Avatar } from "@material-ui/core";
import { useQuery } from "@apollo/client";
import { SESSION } from "../../graphql/auth";
// import { groupByMinute } from "../../helpers/groupMessages";
// import MinuteGroup from "./MinuteGroup";
import useStyles from "../../styles/chatroom/userGroup";
import Message from "./Message";

interface Props {
  messages: any[];
  user: string;
  minute?: string;
}

export default function UserGroup({ user, messages, minute }: Props) {
  const classes = useStyles();

  const { data: session } = useQuery(SESSION);
  
  return (
    <div className={classes.userGroup}>
      <div key={`usergroup-${user}-${minute}`} className={`${classes.wrap} ${user === session.user.data.id ? classes.me : classes.them}`}>
        <div className={classes.avatarWrap}>
          <Avatar className={classes.messageAvatar}>
            { (messages.length > 0) && messages[0].sender.username[0] }
          </Avatar>
        </div>
        <div className={classes.groupWrap}>
          { messages.map((item, i) => (
            <Message
              key={`${item.id}:${minute}`}
              message={item}
              minute={(i === messages.length - 1) ? minute : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// export function UserGroup({ user, messages }: Props) {
//   const classes = useStyles();

//   const { data: session } = useQuery(SESSION);

//   return (
//     <div className={classes.userGroup}>
//       { groupByMinute(messages).map((item, i) => (
//         <div key={`usergroup-${user}-${item.minute}`} className={`${classes.wrap} ${user === session.user.data.id ? classes.me : classes.them}`}>
//           <div className={classes.avatarWrap}>
//             <Avatar className={classes.messageAvatar}>t</Avatar>
//           </div>
//           <div className={classes.groupWrap}>
//             <MinuteGroup key={`${user}:${item.minute}:${i}`} minute={item.minute} messages={item.messages} />
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }
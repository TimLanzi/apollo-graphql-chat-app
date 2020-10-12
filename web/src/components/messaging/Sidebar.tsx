import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, List, ListItem, ListItemText, ListItemAvatar, Avatar, ListItemIcon, CircularProgress } from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import roomName from "../../helpers/roomName";
import { useQuery } from "@apollo/client";
import { SESSION } from "../../graphql/auth";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    // width: "20vw",
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    top: "auto",
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  listSubHeader: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  }
}));

interface Props {
  loading: boolean;
  rooms?: any[];
  makeNewRoom: () => void;
  selectRoom: (arg: string) => void;
  subscribeToNewRooms: () => (() => void);
}

export default function Sidebar({ loading, rooms, makeNewRoom, selectRoom, subscribeToNewRooms }: Props) {
  const classes = useStyles();

  let location = useLocation();

  const { data: session } = useQuery(SESSION);

  useEffect(() => {
    return subscribeToNewRooms()
  }, [subscribeToNewRooms])

  return (
    <Drawer className={classes.drawer} variant="permanent" anchor="left" classes={{
      paper: classes.drawerPaper
    }}>
      <List>
        <ListItem button onClick={makeNewRoom} selected={location.pathname === "/new"}>
          <ListItemText>
            New Message
          </ListItemText>
          <ListItemIcon>
            <AddCircleIcon fontSize="large" />
          </ListItemIcon>
        </ListItem>
        { loading
          ? <CircularProgress />

        : (!rooms || rooms.length <= 0)
          ? null

          : [...rooms].sort((a, b) => a.lastMessage.timestamp < b.lastMessage.timestamp ? 1 : -1).map(item => (
            <ListItem button key={item.id} onClick={() => selectRoom(item.id)} selected={location.pathname === `/room/${item.id}`}>
              <ListItemAvatar>
                <Avatar>
                  {item.name
                    ? item.name[0]
                    : roomName(item.users, session.user.data.username)[0]
                  }
                 </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.name || roomName(item.users, session.user.data.username)}
                secondary={item.lastMessage.content}
                secondaryTypographyProps={{style: {
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}}
              />
            </ListItem>
          ))
        }
      </List>
    </Drawer>
  );
}
import React from "react";
import { useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "@material-ui/core";
import { SESSION } from "../../graphql/auth";
import { logout } from "../../services/auth";
import useStyles from "../../styles/header";

export default function Header() {
  const classes = useStyles();

  let history = useHistory();

  const { data: session } = useQuery(SESSION);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Chat App Test
          </Typography>
          { !session.user.data
            ? <Link href="/login" className={classes.link}>Login</Link>
            : <Link className={classes.link} onClick={() => logout(history)}>Logout</Link>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}
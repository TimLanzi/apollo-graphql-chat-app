import React, { useState, useEffect, FormEvent } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
// import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from "@material-ui/lab";
import Container from '@material-ui/core/Container';
import { LOGIN, SESSION } from "../graphql/auth";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  message: {
    marginTop: theme.spacing(1),
  },
}));

export default function LoginPage() {
  const classes = useStyles();

  let history = useHistory();

  const [login, { loading, error, data }] = useLazyQuery(LOGIN);
  const { data: session } = useQuery(SESSION);

  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!loading) {
      if (error) {
        setMessage(error.message);
      } else if (data) {
        localStorage.setItem("token", data.login);
        if (session.user.refetch) {
          session.user.refetch();
        }
        history.push("/");
      }
    }
  }, [loading, error, data]);

  useEffect(() => {
    if (session.user.data) {
      history.push("/");
    }
  }, [session]);
  
  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (username === "") {
      setMessage("Username required")
      return;
    }

    login({ variables: { username }});
  }
  
  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        { message.length > 0 &&
          <Alert className={classes.message} elevation={6} variant="filled" severity="error">
            {message}
          </Alert>
        }
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={username}
            autoComplete="username"
            autoFocus
            onChange={e => setUsername(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <RouterLink to="/register"> */}
                <Link variant="body2" href="/register">
                  Don't have an account? Sign Up
                </Link>
              {/* </RouterLink> */}
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
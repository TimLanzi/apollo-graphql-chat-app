import React, { useState, useEffect, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { Avatar, Button, TextField, Link, Grid, Typography, Container } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { Alert } from "@material-ui/lab";
import { REGISTER, SESSION } from "../graphql/auth";

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

export default function RegisterPage() {
  const classes = useStyles();

  let history = useHistory();

  const [register, { loading, error, data }] = useMutation(REGISTER);
  const { data: session } = useQuery(SESSION);

  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!loading) {
      if (!error && data) {
        if (data.createUser.error) {
          setMessage(data.createUser.error);
        } else {
          localStorage.setItem("token", data.createUser);
          if (session.user.refetch) {
            session.user.refetch();
          }
        }
      } else if (error) {
        setMessage(error.message);
      }
    }
  }, [loading, error, data]);

  useEffect(() => {
    if (session.user.data) {
      history.push("/new");
    }
  }, [session]);
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (username === "") {
      setMessage("Username required")
      return;
    }

    register({ variables: { username }});
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
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
            Sign Up
          </Button>
          <Grid container>
            <Grid item xs>
              <Link variant="body2" href="/login">
                Have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
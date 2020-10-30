import React, { useState, useEffect, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { Avatar, Button, TextField, Link, Grid, Typography, Container } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Alert } from "@material-ui/lab";
import { REGISTER, SESSION, USER } from "../graphql/auth";
import { userVar } from '../services/apollo/cache';
import useStyles from "../styles/register";

export default function RegisterPage() {
  const classes = useStyles();

  let history = useHistory();

  const { data: session } = useQuery(SESSION);
  const [register, { loading, error, data }] = useMutation(REGISTER);
  const [getUser, { loading: uLoading, error: uError, data: uData }] = useLazyQuery(USER);

  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!loading) {
      if (error) {
        setMessage(error.message);
      } else if (data) {
        localStorage.setItem("token", data.createUser);
        getUser();
      }
    }
  }, [loading, error, data, getUser]);

  useEffect(() => {
    if (!uLoading) {
      if (uError) {
        setMessage(uError.message);
      } else if (uData) {
        userVar({
          loading: false,
          data: uData.session ?? null,
        });
      }
    }
  }, [uLoading, uError, uData]);

  useEffect(() => {
    if (session.user.data) {
      history.push("/new");
    }
  }, [session, history]);
  
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
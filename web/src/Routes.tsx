import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";

const Login = lazy(() => import("./pages/login"));
const Room = lazy(() => import("./pages/room"));
const NewRoom = lazy(() => import("./pages/new"));
const Register = lazy(() => import("./pages/register"));

export default function Routes() {
  return (
      <Suspense fallback={<CircularProgress style={{ marginTop: "6em" }} />}>
    <Switch>
        <Route exact path="/">
          <Room />
        </Route>
        <Route exact path="/new">
          <NewRoom />
        </Route>
        <Route exact path="/:id">
          <Room />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
    </Switch>
      </Suspense>
  )
}
import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
// import LoginPage from "./pages/login";
// import RegisterPage from "./pages/register";
// import HomePage from "./pages/home";

const Login = lazy(() => import("./pages/login"));
const Home = lazy(() => import("./pages/home"));
const Register = lazy(() => import("./pages/register"));

export default function Routes() {
  return (
    <Switch>
      <Suspense fallback={<CircularProgress style={{ marginTop: "6em" }} />}>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
      </Suspense>
    </Switch>
  )
}
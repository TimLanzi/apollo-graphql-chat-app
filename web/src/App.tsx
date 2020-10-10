import React, { useEffect } from 'react';
// import logo from './assets/logo.svg';
// import './App.css';
import Routes from "./Routes";
import Header from "./components/layout/Header";
import { useQuery } from '@apollo/client';
import { USER } from './graphql/auth';
import { userVar } from './services/apollo/cache';
import "./styles/styles.scss";
import { useHistory } from 'react-router-dom';

function App() {
  /* GraphQL hooks */
  const { loading, error, data, refetch } = useQuery(USER);

  let history = useHistory();

  /* Effect hooks */
  useEffect(() => {
    if (!loading) {
      userVar({
        loading: false,
        refetch,
        data: data?.session ?? null,
      });
      
      if (error) {
        // TODO
      }
    }
  }, [loading, error, data]);

  // useEffect(() => {
  //   if (!localStorage.getItem("token")) {
  //     history.replace("/login");
  //   }
  // }, [data]);

  return (
    <div className="App">
      <Header />
      <Routes />
    </div>
  );
}

export default App;

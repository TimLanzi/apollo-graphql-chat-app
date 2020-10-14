import React, { useEffect } from 'react';
import Routes from "./Routes";
import Header from "./components/layout/Header";
import { useQuery } from '@apollo/client';
import { USER } from './graphql/auth';
import { userVar } from './services/apollo/cache';
import "./styles/styles.scss";

function App() {
  /* GraphQL hooks */
  const { loading, error, data, refetch } = useQuery(USER);

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

  return (
    <div className="App">
      <Header />
      { !loading &&
        <Routes />
      }
    </div>
  );
}

export default App;

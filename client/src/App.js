import React from 'react';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider>
      <Router>
      <>
        <Navbar />
          <Switch>
          <Route exact
            path='/' 
            component={SearchBooks} 
          />
          <Route 
            exact path='/saved' 
            element={SavedBooks} 
          />
          <Route 
           render={() => <h1 className='display-2'>Wrong page!</h1>}
          />
          </Switch>
           </>
      </Router>
    </ApolloProvider>
  );
}

export default App;

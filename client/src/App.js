import './css/normalize.css';
import './css/util.css';
import './css/frombelow.css';

import Home from "./pages/Home"
import Admin from "./pages/Admin"
import BootlegStepper from "./components/bootlegstepper"
import Header from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { setContext } from "@apollo/client/link/context";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split
} from "@apollo/client";
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

//establish a new link to the GraphQL server//
const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:3001/graphql',
  connectionParams: {
    authToken: authLink,
  }
}));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  // link: authLink.concat(httpLink),
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="Home">
        <Router>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bootlegstepper" element={<BootlegStepper />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;

import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client/core";
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: 'http://localhost:2000/v1/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const token = window.localStorage.getItem("accessToken");
  console.log(token)
  if (token) {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    };
  } else {
    return { headers };
  }
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
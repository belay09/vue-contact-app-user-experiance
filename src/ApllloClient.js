import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: 'https://todo-wesen.hasura.app/v1/graphql',
  headers:{
    "X-Hasura-Admin-Secret":"U3H7pEIRtvxYkFJSBtaNC7Nro1Ygj7aQUo8BqOGgPrymNGs8hbVRxA1Cy0sfbTln"
  }
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

export default apolloClient;
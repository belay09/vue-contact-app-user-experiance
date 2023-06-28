import { ApolloClient,createHttpLink,InMemoryCache } from "@apollo/client/core";
const getHeaders = () => {
    const headers = {};
    const token = window.localStorage.getItem("accessToken");
    console.log(token)
    if (token) {
      headers.Authorization = `Bearer ${token}`;
      console.log(headers.Authorization )

    } 
    return headers;
  };
const httpLink = createHttpLink({
    uri:'http://localhost:2000/v1/graphql',
    headers:getHeaders()
})
// const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
    link:httpLink,
    cache:new InMemoryCache()
})
export default apolloClient;
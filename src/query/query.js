import gql from 'graphql-tag';
const loginqueries = gql`

query MyQuery($email:String!,$password:String!) {
  login(email: $email, password: $password) {
    accessToken
    message
  }
}

`
const findId = gql`

query MyQuery($email:String!) {
  users(where: {user_email: {_eq: $email}}) {
    user_id
  }
}

`

const signupqueries =  gql`
mutation MyQuery($name:String!,$email:String!,$password:String!) {
    Rigister(email: $email, name: $name, password: $password) {
      message
    }
  } 
`
const findcontacts= gql`
query MyQuery {
  users {
    contacts {
      address
      email
      id
      name
      phone
    }
  }
}`
export {loginqueries,signupqueries,findId,findcontacts} 
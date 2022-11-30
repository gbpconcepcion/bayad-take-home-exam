import {gql, useQuery, useMutation} from '@apollo/client'

//set of all  mutations for wallet users
const LOGIN_MUTATION = gql`
mutation ($username: String!, $password: String!){
  loginWalletUser(username:$username, password:$password)
  {
    response_code
    response_label
    response_message
  }
}
`
const REGISTER_MUTATION = gql`
mutation ($username: String!, $password: String!, $firstname: String!, $lastname: String!){
  addWalletUser(username:$username, password:$password, firstname: $firstname, lastname:$lastname)
  {
    response_code
    response_label
    response_message
  }
}
`

export {REGISTER_MUTATION, LOGIN_MUTATION};
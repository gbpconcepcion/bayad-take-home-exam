import {gql} from '@apollo/client'

//set of all queries for wallet user get operations

const GET_WALLET_USERS = gql`
query getWalletUsers{
  wallet_users{
    username
    firstname
    lastname
    balance
    id
  }
}
`


const GET_WALLET_USER = gql`
query getWalletUser($id: ID!){
  wallet_user(id: $id){
    username
    firstname
    lastname
    balance
    id
  }
}
`

const GET_TRANSACTION_HISTORY = gql`
query getTransactionHistory($id: ID!){
  wallet_user_history(id: $id){
    amount
    date
    id
  }
}
`

const GET_PROFILE = gql`
query getProfile($id: ID!){
wallet_user(id: $id){
    username
    firstname
    lastname
    balance
    id
  }

  wallet_user_history(id: $id){
    amount
    date
    status
    id
  }
}
`




export {GET_WALLET_USERS, GET_WALLET_USER, GET_TRANSACTION_HISTORY, GET_PROFILE};
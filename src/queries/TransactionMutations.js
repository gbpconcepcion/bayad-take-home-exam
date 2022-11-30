import {gql, useQuery, useMutation} from '@apollo/client'


//set of all mutations used by a wallet user to commit transactions
const CASHIN_MUTATION = gql`
mutation ($amount: Float!, $transactor: ID!){
  cashIn(amount: $amount, transactor: $transactor){
    response_code
    response_label
    response_message
  }
}
`

const DEBIT_MUTATION = gql`
mutation($amount: Float!, $transactor: ID!, $balance: Float!) {
  debit(amount: $amount, transactor: $transactor, balance: $balance){
    response_code
    response_label
    response_message
  }
}
`


export {DEBIT_MUTATION, CASHIN_MUTATION};
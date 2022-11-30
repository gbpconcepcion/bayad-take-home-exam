import {gql, useQuery} from '@apollo/client'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {GET_WALLET_USERS} from '../queries/WalletUserQueries'
import {useNavigate} from 'react-router-dom'
import { useCallback } from 'react';
import { AuthContext } from '../context/auth';
import React, {useContext} from 'react'

export default function WalletUser() {
  var selectedWallet = null
  const context = useContext(AuthContext)
  console.log(context)

  console.log('test')

  //query to get all available users
  const {loading, error, data } =  useQuery(GET_WALLET_USERS)

  //values of users referenced by Datatable component from prime
  var walletUsers = []
  if(data)
  {
    walletUsers = data?.wallet_users
  }

  console.log(walletUsers)

    const navigate = useNavigate()


  //navigates to the walletuserviewer with the acquired value as id for the params
  const checkWallet = (value) =>{

    console.log(value)
    console.log(value.id)
    navigate(`/account_viewer/${value.id}`, {replace: true})
  }

  if(loading) return <p>Loading...</p>
  if(error) return <p>You Fucked Up</p>


  const cardContainer = {
            padding:20,
            backgroundColor:'#fffdfd',
            shadowColor: "#000000",
            borderRadius: "4px",
            boxShadow: '1px 2px 9px #2f2e2e5e',

    }
  return <>{!loading && !error}
        <div>
            <div className="card m-4" style={cardContainer}>
                <DataTable
                    className="m-4"
                    value={walletUsers} 
                    selectionMode="single" 
                    selection={selectedWallet}
                    onSelectionChange={e => checkWallet(e.value)} dataKey="id" 
                    responsiveLayout="scroll">
                    <Column field="username" header="Username"></Column>
                    <Column field="firstname" header="Firstname"></Column>
                    <Column field="lastname" header="Lastname"></Column>
                    <Column field="balance" header="Balance"></Column>
                </DataTable>
            </div>
        </div>
  </>
  
}

import React, {useContext} from 'react'
import {gql, useMutation} from '@apollo/client'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {LOGIN_MUTATION} from '../queries/WalletUserMutations'
import {useState} from 'react'
import { InputText } from 'primereact/inputtext';

import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';

import {useNavigate} from 'react-router-dom'
import { Button } from 'primereact/button';
import { AuthContext } from '../context/auth';

export default function LoginUser() {
  const context = useContext(AuthContext)

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate()

//mutation for loging in and verifying credentials. creates a response token upon success
const [register] = useMutation(LOGIN_MUTATION, {
    update(proxy, result){
        console.log(result)

        //if successful sends acquired token from backend 
        if(result.data?.loginWalletUser?.response_code === 200)
        {
          //send token to Auth Contex
            context.login(result.data?.loginWalletUser?.response_message)
            console.log(result.data?.loginWalletUser?.response_message )

            //navs to home
            navigate(`/`, {replace: true})
        }
    },
    variables: {
        username: username,
        password: password,
    }
  })

const cardContainer = {
        padding:20,
        backgroundColor:'#fdfdfd',
        shadowColor: "#000000",
        borderRadius: "4px",
        boxShadow: '1px 2px 9px #2f2e2e5e',
}

  return (
    <>
        <div className='card-container'>
            <div className="flex-1 my-4 ml-4 mr-2 h-4rem font-bold p-4 border-round" style={cardContainer}>
                <div className="font-bold p-4 border-round mb-3 font-bold">
                    <span className="p-float-label">
                        <InputText  className='w-full' id="in" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="in">Username</label>
                    </span>
                </div>
                <div className="block font-bold p-4 border-round mb-3">      
                    <span className="p-float-label">
                        <InputText className='w-full' id="in" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="in">Password</label>
                    </span>

                </div>
                <div className="block font-bold p-4 border-round mb-3">
                    <Button className="w-full" style={{ background: "#F55D29", border: "#FF9354" }} label="Login" icon="pi pi-history" onClick={register} />

                </div>
            </div>
        </div>
      
    </>
  )
}

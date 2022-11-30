import React from 'react'
import {gql, useMutation} from '@apollo/client'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {REGISTER_MUTATION} from '../queries/WalletUserMutations'
import {useContext, useState} from 'react'
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';

import { AuthContext } from '../context/auth';

import {useNavigate} from 'react-router-dom'

import { Button } from 'primereact/button';

export default function RegisterUser() {
  const context = useContext(AuthContext)


const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [firstname, setFirstname] = useState("");
const [lastname, setLastname] = useState("");
const navigate = useNavigate()

//mutation for registering or creating another wallet user and acquire a response token after
const [register] = useMutation(REGISTER_MUTATION, {
    update(proxy, result){
        console.log(result)
        
        //if successful sends acquired token from backend 
        if(result.data?.addWalletUser?.response_code === 200)
        {
            //send token to Auth Contex
            context.login(result.data?.loginWalletUser?.response_message)
            console.log(result.data?.loginWalletUser?.response_message )
            console.log(result)

            //navs to Home
            navigate(`/`, {replace: true})
        }

        
    },
    variables: {
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
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
                        <InputText className='w-full' id="in" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="in">Username</label>
                    </span>
                </div>
                <div className="block font-bold p-4 border-round mb-3">      
                    <span className="p-float-label">
                        <InputText  className='w-full' id="in" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="in">Password</label>
                    </span>

                </div>
                <div className="block font-bold p-4 border-round mb-3">
                    <span className="p-float-label">
                        <InputText  className='w-full' id="in" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                        <label htmlFor="in">Firstname</label>
                    </span>
                </div>
                <div className="block font-bold p-4 border-round mb-3">
                    <span className="p-float-label">
                        <InputText  className='w-full' id="in" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                        <label htmlFor="in">Lastname</label>
                    </span>
                </div>
                <div className="block font-bold p-4 border-round mb-3">
                    <Button className="w-full" style={{ background: "#F55D29", border: "#FF9354" }} label="Register" icon="pi pi-history" onClick={register} />

                </div>
            </div>
        </div>
      
    </>
  )
}

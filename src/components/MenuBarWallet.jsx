import React from 'react'
import { Menubar } from 'primereact/menubar';
import { Button } from 'primereact/button';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {useNavigate} from 'react-router-dom'

//component for the navigation
export default function MenuBarWallet() {
    const items = [

        {
            label: 'Wallets',
            icon: 'pi pi-wallet',
            command: () => {
            window.location.href='/';
            }
        },
        {
            label: 'Register',
            icon: 'pi pi-credit-card',
            command: () => {
            window.location.href='/register';
            }
        },
        {
            label: 'Login',
            icon: 'pi pi-user',
            command: () => {
            window.location.href='/login';
            }
        }
    ];

    const navigate = useNavigate()

    


    const end = <div className='flex'>
        <div className="mx-2">
            <Button className='m-2' label="Sign Out" style={{ background: "#F55D29",  border: "#FF9354" }}/>
        </div>
    </div>
    
    // const end = <Button label="Sign Out" style={{ background: "#F55D29",  border: "#FF9354" }}/>;

  return (
    
        <div>
            <div className="card">
                <Menubar model={items} end={end} />
            </div>
        </div>
  )
}

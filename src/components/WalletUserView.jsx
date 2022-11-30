import {gql, useQuery, useMutation} from '@apollo/client'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {GET_WALLET_USER, GET_TRANSACTION_HISTORY, GET_PROFILE} from '../queries/WalletUserQueries'
import {DEBIT_MUTATION, CASHIN_MUTATION} from '../queries/TransactionMutations'
import {useNavigate} from 'react-router-dom'
import { useCallback } from 'react';
import {Link, useParams} from 'react-router-dom'
import {useState} from 'react'
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Sidebar } from 'primereact/sidebar';
import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method

//wallet viewr component
export default function WalletUserView() {
  const { id } = useParams();
  
  //gets profile of user along with the balance and history of tranasactions
  const {loading, error, data } =  useQuery(GET_PROFILE, {
    variables: {
        id: id
    }
  });
  const navigate = useNavigate()

  console.log(data)
  var history = []
  var walletUser = null
  var balance = 0

  if(data)
  {
    walletUser = data?.wallet_user
    history = data?.wallet_user_history
  }

  console.log(balance)
  console.log(history)
  console.log(walletUser)

  //amount used for both transaction mutations
  const [amount, setAmount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [confirmSuccessVisible, setSuccessVisible] = useState(false);
  const [confirmFailVisible, setFailVisible] = useState(false);


  //confirm dialogs for transaction successful and fail
  const confirmSuccess = () => {
    confirmDialog({
            message: 'Transaction Successful',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => navigate(`/account_viewer/${id}`, {replace: true}),
     });
   }

  const confirmFail= () => {
    confirmDialog({
            message: 'Transaction Failed',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => navigate(`/account_viewer/${id}`, {replace: true}),
     });
   }


  //mutation for cashing in based on amount and id from the params
  const [cashin] = useMutation(CASHIN_MUTATION, {
    update(proxy, result){
        console.log(result)
        if(result.data?.cashIn?.response_code === 200)
        {
            console.log(result.data?.cashIn);
            //opens confirmdialoge
            setSuccessVisible(true)

            console.log(confirmSuccessVisible);

        }
        else
        {
            setFailVisible(true)
        }

    },
    variables: {
        amount: amount,
        transactor: id
    },
    //refreshes queries
    refetchQueries: [{GET_PROFILE}]
  })

  //mutation for debit withdrawal based on amount and id from the params
  const [debit] = useMutation(DEBIT_MUTATION, {
    update(proxy, result){
        console.log(result)
        if(result.data?.debit?.response_code === 200)
        {
            //opens confirmdialoge
            confirmSuccessVisible = true;

        }
        else
        {
            confirmFailVisible = true
        }

    },
    variables: {
        amount: amount,
        transactor: id,
        balance: walletUser?.balance
    },
    
    refetchQueries: [{GET_PROFILE}]
  })


  if(loading) return <p>Loading...</p>
  if(error) return <p>You Fucked Up</p>


  console.log(history)

  //card style
  const cardContainer = {
            padding:20,
            backgroundColor:'#fdfdfd',
            shadowColor: "#000000",
            borderRadius: "4px",
            boxShadow: '1px 2px 9px #2f2e2e5e',
    }

  return <>{!loading && !error}
        <div>
            <div className="card">
                
                <Sidebar visible={visible} onHide={() => setVisible(false)}>
                    <div className="flex my-4 align-items-start">
                        <div className="w-full ml-3">
                            {
                                history.map(transaction =>{
                                    return(
                                        <div className="card">
                                            
                                            <div className="flex my-4 px-2 py-4" 
                                            style={transaction.status > 0? 
                                            { padding:20, backgroundColor: "#2ddb67", border:"3px solid #85f9b0", borderRadius: '4px' }:
                                            { padding:20, backgroundColor: "#f46565", border:"3px solid #f6a5a5", borderRadius: '4px' }}>
                                                <div className="w-full ml-3 text-white">
                                                    {transaction.amount > 0? "Cash-In": "Debit" }
                                                </div> 
                                                <div className="w-full ml-3 text-white">
                                                    {transaction.amount}
                                                </div>
                                                

                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Sidebar>
                <ConfirmDialog/>

                <ConfirmDialog visible={visible} onHide={() => setSuccessVisible(false)} message="Are you sure you want to proceed?"
                    header="Confirmation" icon="pi pi-exclamation-triangle" />

                <div className="flex card-container">
                        <div className="flex-1 my-4 ml-4 mr-2 h-4rem font-bold p-4 border-round" style={cardContainer}>
                            <div className="font-bold p-4 border-round mb-3 font-bold">
                                Username: {walletUser.username}
                            </div>
                            <div className="block font-bold p-4 border-round mb-3">
                                
                                Given Name: {`${walletUser.firstname} ${walletUser.lastname}`} 

                            </div>
                            <div className="block font-bold p-4 border-round mb-3">
                                Balance: {walletUser.balance}
                            </div>
                        </div>
                        <div className="flex-1 my-4 mr-4 ml-2 h-4rem font-bold text-center p-4 border-round align-content-center" style={cardContainer}>
                            <div className="flex card-container my-2">
                                <div className="flex-1 h-4rem font-bold text-center ml-4 mr-2 border-round">
                                    <InputNumber className="w-full" value={amount} onValueChange={(e) => setAmount(e.value)} mode="decimal" minFractionDigits={2} maxFractionDigits={2} />
                                   

                                </div>
                                <div className="flex-1 h-4rem font-bold text-center mr-4 ml-2 border-round ">
                                    <Button className="w-full" style={{ background: "#F55D29", border: "#FF9354" }} label="Transaction History" icon="pi pi-history" onClick={() => setVisible(true)} />
                                    

                                </div>
                               
                            </div>

                            <div className="flex card-container my-2">
                                <div className="flex-1 h-4rem font-bold text-center ml-4 mr-2 border-round">
                                    <Button className="w-full" style={{ background: "#F55D29", border: "#FF9354" }} label="Cash-In" icon="pi pi-money-bill" onClick={cashin} />

                                </div>
                                <div className="flex-1 h-4rem font-bold text-center mr-4 ml-2 border-round">
                                    <Button className="w-full" style={{ background: "#F55D29", border: "#FF9354" }} label="Debit" icon="pi pi-money-bill" onClick={debit} />

                                </div>
                               
                            </div>


                        </div>

                </div>

                
            </div>
        </div>
  </>
  
}
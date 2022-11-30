import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import MenuBarWallet from "./components/MenuBarWallet"
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import { ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'
import WalletUser from "./components/WalletUser";
import Wallets from "./pages/Wallets"
import NotFound from "./pages/NotFound"
import AccountViewer from "./pages/AccountViewer"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { AuthProvider } from './context/auth';


//apollo client which handles queries and mutations with the graph layer of the server
const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
})


function App() {
  return (
    <>
      <AuthProvider>
        <ApolloProvider client={client}>
          <Router>
            <MenuBarWallet/>
            <div className="container">
              <Routes>
                <Route path='/' element={<Wallets/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/account_viewer/:id' element={<AccountViewer/>}/>
                <Route path='*' element={<NotFound/>}/>
              </Routes>
            </div>  
          </Router>
        </ApolloProvider>
      </AuthProvider>
  
    </>

  );
}

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



import Login from './pages/Login';
import ResponsiveDrawer from './components/ResponsiveDrawer.js';
import Accounts from './pages/Accounts';
import Transactions from './pages/Transactions.js';
import User from './pages/User';

const App = () => {
  return (
    <div className='App'>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/' element={<ResponsiveDrawer />} >
            <Route path='/accounts' element={<Accounts />} />
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/user' element={<User />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>


  );
};

export default App;
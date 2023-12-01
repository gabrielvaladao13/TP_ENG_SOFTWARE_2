import React from 'react';
import { useNavigate, BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Paper from '@mui/material/Paper';

import Accounts from '../pages/Accounts';
import Transactions from '../pages/Transactions';
import User from '../pages/User';

const drawerWidth = 240;

const ResponsiveDrawer = () => {
  const [open, setOpen] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box'},
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <ListItem key="Contas" disablePadding>
                <ListItemButton onClick={() => handleNavigate('/accounts')}>
                  <ListItemIcon>
                    <AccountBalanceIcon />
                  </ListItemIcon>
                  <ListItemText primary="Contas" />
                </ListItemButton>
              </ListItem>

              <ListItem key="Transações" disablePadding>
                <ListItemButton onClick={() => handleNavigate('/transactions')}>
                  <ListItemIcon>
                    <AttachMoneyIcon />
                  </ListItemIcon>
                  <ListItemText primary="Transações" />
                </ListItemButton>
              </ListItem>
            </List>

            <Divider />

            <List>
              <ListItem key="Usuário" disablePadding>
                <ListItemButton onClick={() => handleNavigate('/user')}>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Usuário" />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
          <Toolbar />
          <Routes>
            <Route path='/accounts' element={<Accounts />} />
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/user' element={<User />} />
          </Routes>
      </Box>
    </>
  );
};

export default ResponsiveDrawer;
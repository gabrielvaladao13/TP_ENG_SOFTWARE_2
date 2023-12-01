import React, { useState } from 'react';
import { Typography, Paper, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import CakeIcon from '@mui/icons-material/Cake';
import EditIcon from '@mui/icons-material/Edit';
import EditUserForm from '../components/EditUserForm';

const StyledPaper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  margin: '7%',
  marginLeft: '4%',
  borderRadius: 20,
  padding: '3%',
  width: '100%',
  height: '100%',
  gap: 20,
});

export const DataAlign = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'left',
  alignItems: 'center',
  gap: 20,
});

const User = () => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const userData = {
    name: 'Gabriela Fonseca',
    email: 'gabriela@gmail.com',
    age: 22,
  };

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
  };

  return (
    <>
      <StyledPaper elevation={3}>
        <DataAlign>
          <Typography component="h1" variant="h5">
            Meus Dados
          </Typography>
          <IconButton onClick={handleEditClick} color="primary">
            <EditIcon />
          </IconButton>
        </DataAlign>
        <DataAlign>
          <PersonIcon />
          <Typography variant="body1">
            <strong>Nome:</strong> {userData.name}
          </Typography>
        </DataAlign>
        <DataAlign>
          <EmailIcon />
          <Typography variant="body1">
            <strong>Email:</strong> {userData.email}
          </Typography>
        </DataAlign>
        <DataAlign>
          <CakeIcon />
          <Typography variant="body1">
            <strong>Idade:</strong> {userData.age}
          </Typography>
        </DataAlign>
      </StyledPaper>
      <EditUserForm open={editDialogOpen} handleClose={handleCloseEditDialog} userData={userData} />
    </>
  );
};

export default User;
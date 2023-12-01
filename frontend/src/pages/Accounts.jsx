import React, { useState } from 'react';
import {
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
} from '@mui/material';
import { styled } from '@mui/system';
import DeleteConfirmationDialog from '../components/DeleteConfirmationDialog';
import NewAccountDialog from '../components/NewAccountDialog';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const StyledPaper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '7%',
  marginLeft: '4%',
  borderRadius: 20,
  padding: '3%',
  width: '100%',
  height: '100%',
});

const accountData = [
  { id: 1, agencia: 123456, conta: 123456789, saldo: 10000.00 },
  { id: 2, agencia: 789012, conta: 789012345, saldo: 20000.00 },
  { id: 3, agencia: 345678, conta: 345678901, saldo: 30000.00 },
];

const Accounts = () => {
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    account: null,
  });

  const [newAccountDialog, setNewAccountDialog] = useState({
    open: false,
  });

  const nextAccountId = () => accountData.length + 1;

  const handleOpenDeleteConfirmation = (account) => {
    setDeleteConfirmation({
      open: true,
      account: account,
    });
  };

  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmation({
      open: false,
      account: null,
    });
  };

  const handleConfirmDelete = () => {
    // DELETAR CONTA
    console.log(`Delete account with ID ${deleteConfirmation.account?.id}`);
    handleCloseDeleteConfirmation();
  };

  const handleCancelDelete = () => {
    handleCloseDeleteConfirmation();
  };

  const handleOpenNewAccountDialog = () => {
    setNewAccountDialog({
      open: true,
    });
  };

  const handleCloseNewAccountDialog = () => {
    setNewAccountDialog({
      open: false,
    });
  };

  const handleConfirmNewAccount = (newAccount) => {
    // ADD NOVA CONTA
    console.log('New account:', newAccount);
    handleCloseNewAccountDialog();
  };

  return (
    <StyledPaper elevation={3}>
      <Typography component="h1" variant="h5">
        Contas
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Agência</TableCell>
              <TableCell>Conta</TableCell>
              <TableCell>Saldo</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accountData.map((account) => (
              <TableRow key={account.id}>
                <TableCell style={{ width: '15%' }}>{account.id}</TableCell>
                <TableCell style={{ width: '25%' }}>{account.agencia}</TableCell>
                <TableCell style={{ width: '25%' }}>{account.conta}</TableCell>
                <TableCell style={{ width: '25%' }}>{account.saldo.toFixed(2)}</TableCell>
                <TableCell style={{ width: '10%' }}>
                  <IconButton
                    variant="contained"
                    color="error"
                    onClick={() => handleOpenDeleteConfirmation(account)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          variant="contained"
          color="primary"
          style={{
            marginTop: '2%',
          }}
          onClick={handleOpenNewAccountDialog}
        >
          Adicionar Nova Conta
        </Button>
      </TableContainer>

      <DeleteConfirmationDialog
        open={deleteConfirmation.open}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        itemText={`a conta com ID ${deleteConfirmation.account?.id}`}
      />

      <NewAccountDialog
        open={newAccountDialog.open}
        onClose={handleCloseNewAccountDialog}
        onConfirm={handleConfirmNewAccount}
        nextAccountId={nextAccountId}
      />
    </StyledPaper>
  );
};

export default Accounts;
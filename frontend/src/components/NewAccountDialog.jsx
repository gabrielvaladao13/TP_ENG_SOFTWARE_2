import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

const NewAccountDialog = ({ open, onClose, onConfirm, nextAccountId }) => {
  const [newAccount, setNewAccount] = useState({
    agencia: '',
    conta: '',
    saldo: '',
  });

  const handleFieldChange = (field, value) => {
    setNewAccount((prevAccount) => ({ ...prevAccount, [field]: value }));
  };

  const handleConfirm = () => {
    // Adiciona o ID automático antes de confirmar
    const accountWithId = { ...newAccount, id: nextAccountId() };
    onConfirm(accountWithId);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Nova Conta</DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          fullWidth
          label="Agência"
          value={newAccount.agencia}
          onChange={(e) => handleFieldChange('agencia', e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Conta"
          value={newAccount.conta}
          onChange={(e) => handleFieldChange('conta', e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Saldo"
          value={newAccount.saldo}
          onChange={(e) => handleFieldChange('saldo', e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleConfirm}  variant="contained" color="primary">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewAccountDialog;
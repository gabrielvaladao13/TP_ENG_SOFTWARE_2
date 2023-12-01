import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

import Logo from '../asserts/Logo.svg';



const NewTransactionDialog = ({ open, onClose, onConfirm, nextTransactionId }) => {
  const [newTransaction, setNewTransaction] = useState({
    type: 'receita',
    category: '',
    agency: '',
    value: '',
    date: '',
  });

  const handleFieldChange = (field, value) => {
    setNewTransaction((prevTransaction) => ({ ...prevTransaction, [field]: value }));
  };

  const handleConfirm = () => {
    // Adiciona o ID automático antes de confirmar
    const transactionWithId = { ...newTransaction, id: nextTransactionId() };
    onConfirm(transactionWithId);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Nova Transação</DialogTitle>
      <DialogContent>
      <TextField
          margin="normal"
          fullWidth
          label="Tipo"
          value={newTransaction.type}
          onChange={(e) => handleFieldChange('type', e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Categoria"
          value={newTransaction.category}
          onChange={(e) => handleFieldChange('category', e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Agência"
          value={newTransaction.agency}
          onChange={(e) => handleFieldChange('agency', e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Valor"
          value={newTransaction.value}
          onChange={(e) => handleFieldChange('value', e.target.value)}
        />
        <TextField
          margin="normal"
          fullWidth
          type="date"
          value={newTransaction.date}
          onChange={(e) => handleFieldChange('date', e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleConfirm}  variant="Agenciained" color="primary">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewTransactionDialog;
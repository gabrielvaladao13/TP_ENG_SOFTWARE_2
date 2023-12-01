// components/DeleteConfirmationDialog.jsx
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

const DeleteConfirmationDialog = ({ open, onCancel, onConfirm, itemText }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Confirmar Exclusão</DialogTitle>
      <DialogContent>
        <Typography>
          Deseja deletar {itemText}?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error">
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
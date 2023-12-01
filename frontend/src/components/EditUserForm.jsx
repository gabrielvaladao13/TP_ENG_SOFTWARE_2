import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const EditUserForm = ({ open, handleClose, userData }) => {
    const [editedData, setEditedData] = useState({
        name: userData.name,
        email: userData.email,
        age: userData.age,
        password: userData.password
    });

    const handleInputChange = (field, value) => {
        setEditedData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleSaveChanges = () => {
        // SALVAR ALTERAÇÕES
        console.log('Saving changes:', editedData);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Editar Dados</DialogTitle>
            <DialogContent>
                <TextField
                    label="Nome"
                    fullWidth
                    margin="normal"
                    value={editedData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                />
                <TextField
                    label="Idade"
                    fullWidth
                    margin="normal"
                    value={editedData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                />
                <TextField
                    label="Email"
                    fullWidth
                    margin="normal"
                    value={editedData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                />
                <TextField
                    label="Senha"
                    fullWidth
                    margin="normal"
                    value={editedData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancelar</Button>
                <Button variant="contained" color="primary" onClick={handleSaveChanges}>
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditUserForm;
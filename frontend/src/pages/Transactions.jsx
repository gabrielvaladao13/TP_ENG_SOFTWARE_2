import React, { useState } from 'react';
import {
    Button,
    Typography,
    Container,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { styled } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';

const StyledPaper = styled(Paper)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '8%',
    marginLeft: '4%',
    borderRadius: 20,
    padding: '3%',
    width: '100%',
    height: '100%',
});

const transactionData = [
    { id: 1, type: 'receita', category: 'lazer', account: '123456-7', value: 500.25, date: '2023-11-30' },
    { id: 2, type: 'despesa', category: 'supermercado', account: '765432-1', value: 1200.75, date: '2023-11-29' },
    { id: 3, type: 'receita', category: 'restaurante', account: '987654-3', value: 300.0, date: '2023-11-28' },
    { id: 4, type: 'despesa', category: 'lazer', account: '987654-3', value: 300.0, date: '2023-11-27' },
];

const Transactions = () => {
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'type', headerName: 'Tipo', width: 120 },
        { field: 'category', headerName: 'Categoria', width: 150 },
        { field: 'account', headerName: 'Conta', width: 200 },
        { field: 'value', headerName: 'Valor', width: 150 },
        { field: 'date', headerName: 'Data', width: 150 },
        {
            field: 'actions',
            headerName: 'Ações',
            width: 150,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleOpenDeleteConfirmation(params.row.id)}
                >
                    Deletar
                </Button>
            ),
        },
    ];

    const [deleteConfirmation, setDeleteConfirmation] = useState({
        open: false,
        transactionId: null,
    });

    const handleOpenDeleteConfirmation = (transactionId) => {
        setDeleteConfirmation({
            open: true,
            transactionId: transactionId,
        });
    };

    const handleCloseDeleteConfirmation = () => {
        setDeleteConfirmation({
            open: false,
            transactionId: null,
        });
    };

    const handleConfirmDelete = () => {
        // Implement logic to delete the transaction with the given ID
        console.log(`Delete transaction with ID ${deleteConfirmation.transactionId}`);
        handleCloseDeleteConfirmation();
    };

    const handleCancelDelete = () => {
        handleCloseDeleteConfirmation();
    };

    const rows = transactionData.map((transaction) => ({
        id: transaction.id,
        type: transaction.type,
        category: transaction.category,
        account: transaction.account,
        value: transaction.value.toFixed(2),
        date: transaction.date,
    }));

    return (
        <StyledPaper elevation={3}>
            <Typography component="h1" variant="h5">
                Transações
            </Typography>

            <div style={{ height: 400, width: '100%', margin: '2%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    padding="center"
                />
            </div>

            <Button
                variant="contained"
                color="primary"
                style={{
                    marginTop: '2%',
                }}
            >
                Nova Transação
            </Button>

            <Dialog open={deleteConfirmation.open} onClose={handleCloseDeleteConfirmation}>
                <DialogTitle>Confirmar Exclusão</DialogTitle>
                <DialogContent>
                    <Typography>
                        Deseja deletar esta transação?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmDelete} variant="contained" color="error">
                        Deletar
                    </Button>
                </DialogActions>
            </Dialog>
        </StyledPaper>
    );
};

export default Transactions;
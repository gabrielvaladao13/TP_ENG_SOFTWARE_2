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
import NewTransactionDialog from '../components/NewTransactionDialog';
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

const transactionData = [
    { id: 1, type: 'receita', category: 'lazer', account: '123456-7', value: 500.25, date: '2023-11-30' },
    { id: 2, type: 'despesa', category: 'supermercado', account: '765432-1', value: 1200.75, date: '2023-11-29' },
    { id: 3, type: 'receita', category: 'restaurante', account: '987654-3', value: 300.0, date: '2023-11-28' },
    { id: 4, type: 'despesa', category: 'lazer', account: '987654-3', value: 300.0, date: '2023-11-27' },
];

const Transactions = () => {
    const [deleteConfirmation, setDeleteConfirmation] = useState({
        open: false,
        transaction: null,
    });

    const [newTransactionDialog, setNewTransactionDialog] = useState({
        open: false,
    });

    const nextTransactionId = () => transactionData.length + 1;

    const handleOpenDeleteConfirmation = (transaction) => {
        setDeleteConfirmation({
            open: true,
            transaction: transaction,
        });
    };

    const handleCloseDeleteConfirmation = () => {
        setDeleteConfirmation({
            open: false,
            transaction: null,
        });
    };

    const handleConfirmDelete = () => {
        // DELETAR TRANSAÇÃO
        console.log(`Delete transaction with ID ${deleteConfirmation.transaction?.id}`);
        handleCloseDeleteConfirmation();
    };

    const handleCancelDelete = () => {
        handleCloseDeleteConfirmation();
    };

    const handleOpenNewTransactionDialog = () => {
        setNewTransactionDialog({
            open: true,
        });
    };

    const handleCloseNewTransactionDialog = () => {
        setNewTransactionDialog({
            open: false,
        });
    };

    const handleConfirmNewTransaction = (newTransaction) => {
        // ADD NOVA TRANSAÇÃO NA LISTA
        console.log('New transaction:', newTransaction);
        handleCloseNewTransactionDialog();
    };

    return (
        <StyledPaper elevation={3}>
            <Typography component="h1" variant="h5">
                Transações
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Categoria</TableCell>
                            <TableCell>Conta</TableCell>
                            <TableCell>Valor</TableCell>
                            <TableCell>Data</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactionData.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell style={{ width: '15%' }}>{transaction.id}</TableCell>
                                <TableCell style={{ width: '15%' }}>{transaction.type}</TableCell>
                                <TableCell style={{ width: '15%' }}>{transaction.category}</TableCell>
                                <TableCell style={{ width: '15%' }}>{transaction.account}</TableCell>
                                <TableCell style={{ width: '15%' }}>{transaction.value.toFixed(2)}</TableCell>
                                <TableCell style={{ width: '15%' }}>{transaction.date}</TableCell>
                                <TableCell style={{ width: '10%' }}>
                                    <IconButton
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleOpenDeleteConfirmation(transaction)}
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
                    onClick={handleOpenNewTransactionDialog}
                >
                    Nova Transação
                </Button>
            </TableContainer>

            <DeleteConfirmationDialog
                open={deleteConfirmation.open}
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                itemText={`a transação ${deleteConfirmation.transaction?.id}`}
            />

            <NewTransactionDialog
                open={newTransactionDialog.open}
                onClose={handleCloseNewTransactionDialog}
                onConfirm={handleConfirmNewTransaction}
                nextTransactionId={nextTransactionId}
            />
        </StyledPaper>
    );
};

export default Transactions;
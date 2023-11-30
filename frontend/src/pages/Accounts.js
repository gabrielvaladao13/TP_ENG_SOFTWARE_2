import React from 'react';
import { Button, TextField, Typography, Container, CssBaseline, Paper, Table, TableBody, TableRow, TableCell, TableHead, TableContainer } from '@mui/material';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '5%',
  marginLeft: '2%',
  borderRadius: 20,
  padding: '3%',
  width: '100%',
  height: '100%',

});

const accountData = [
  { agencia: 123456, conta: 123456789, saldo: 10000.00 },
  { agencia: 789012, conta: 789012345, saldo: 20000.00 },
  { agencia: 345678, conta: 345678901, saldo: 30000.00 },
];

const Accounts = () => {
  return (
      <StyledPaper elevation={3}>
        <Typography component="h1" variant="h5">
          Accounts
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Agency</TableCell>
                <TableCell>Account Number</TableCell>
                <TableCell>Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accountData.map((account) => (
                <TableRow key={account.conta}>
                  <TableCell style={{ width: '25%' }}>{account.agencia}</TableCell>
                  <TableCell style={{ width: '25%' }}>{account.conta}</TableCell>
                  <TableCell style={{ width: '25%' }}>{account.saldo.toFixed(2)}</TableCell>
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
          >
            Adicionar Nova Conta
          </Button>
        </TableContainer>
      </StyledPaper>

  );
};

export default Accounts;
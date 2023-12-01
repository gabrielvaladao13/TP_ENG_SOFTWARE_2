import React from 'react';
import { Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import CakeIcon from '@mui/icons-material/Cake';

const StyledPaper = styled(Paper)({
    display: 'flex',
    flexDirection: 'column',
    margin: '7%',
    marginLeft: '4%',
    borderRadius: 20,
    padding: '3%',
    width: '100%',
    height: '100%',
    gap: 20
});

export const DataAlign = styled('div')({
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
    gap: 20

});

const User = () => {
    return (
        <StyledPaper elevation={3}>
            <DataAlign>
                <Typography component="h1" variant="h5">
                    Meus Dados 
                </Typography>
            </DataAlign>
            <DataAlign>
                <PersonIcon/>
                <Typography variant="body1">
                    <strong>Nome:</strong> Gabriela Fonseca
                </Typography>
            </DataAlign>
            <DataAlign>
                <EmailIcon/>
                <Typography variant="body1">
                    <strong>Email:</strong> gabriela@gmail
                </Typography>
            </DataAlign>
            <DataAlign>
                <CakeIcon/>
                <Typography variant="body1">
                    <strong>Idade:</strong> 22
                </Typography>
            </DataAlign>
        </StyledPaper>
    );
};

export default User;
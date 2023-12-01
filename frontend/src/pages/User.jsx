import React from 'react';
import { Button, TextField, Typography, Container, CssBaseline, Paper } from '@mui/material';
import { styled } from '@mui/system';


const StyledPaper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '50%',
  borderRadius: 20,
  padding: '10%',
});



const User = () => {
    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <StyledPaper elevation={3}>
            <Typography component="h1" variant="h5">
            User
            </Typography>
        </StyledPaper>
        </Container>
    );
};

export default User;
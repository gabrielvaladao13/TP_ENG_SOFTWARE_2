import React from 'react';
import { Button, TextField, Typography, Container, CssBaseline, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const StyledPaper = styled(Paper)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '50%',
  borderRadius: 20,
  padding: '10%',
});

const StyledForm = styled('form')({
  width: '100%',
  marginTop: (theme) => theme.spacing(1),
});


const Login = () => {
    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/Accounts');
    };
    
    return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <StyledPaper elevation={3}>
            <Typography component="h1" variant="h5">
            Login
            </Typography>
            <StyledForm>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Endereço de E-mail"
                name="email"
                autoComplete="email"
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}

            >
                Entrar
            </Button>
            </StyledForm>
        </StyledPaper>
        </Container>
    );
};

export default Login;
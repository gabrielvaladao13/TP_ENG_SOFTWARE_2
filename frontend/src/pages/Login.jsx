import React from 'react';
import { Button, TextField, Typography, Container, CssBaseline, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

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

const LogoImage = styled('img')({
    width: '50%',
    marginBottom: '20px',
});


const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    function handleEmailChange(event) {
        setEmail(event.target.value);
    }

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!email || !password) {
            alert('Por favor, preencha todos os campos.');
            return;
        }
        axios.post('/api/usuarios/login', { email, password }, { withCredentials: true }).then((res) => navigate('/accounts'))
            .catch((err) => alert('Login Failed.'));

    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <StyledPaper elevation={3}>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <StyledForm method="POST" onSubmit={handleSubmit} >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Endereço de E-mail"
                        name="email"
                        autoComplete="email"
                        required onChange={handleEmailChange} value={email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Senha"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        required onChange={handlePasswordChange} value={password}
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
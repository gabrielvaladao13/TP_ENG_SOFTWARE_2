import React from 'react';

import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Input,
  Button
} from '@mui/material';

import {
  StyledContainer,
  CentralCard,
  LogoImage,
  Title,
  LoginForm,
  SubmitButtonStyle,
} from './Styles';

import Logo from '../../icone-financas.png';

export default function Login() {
  return (
    <StyledContainer>
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <CentralCard
        style={{ borderRadius: 20 }}
      >
        <LogoImage src={Logo} alt="Logo" />
        <Title>Login</Title>
        <LoginForm>
          <TextField
            label="Email"
            name="email"
            id="standard-start-adornment"
            variant="standard"
            style={{
              width: '80%',
              minWidth: 230
            }}
          />

          <FormControl variant="standard"
            style={{
              width: '80%',
              minWidth: 230
            }}
          >
            <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
            <Input/>
          </FormControl>

          <Button
            // type="submit"
            variant="contained"
            style={SubmitButtonStyle}
          >Entrar</Button>
        </LoginForm>
      </CentralCard>
    </Box>
  </StyledContainer>
  );
}
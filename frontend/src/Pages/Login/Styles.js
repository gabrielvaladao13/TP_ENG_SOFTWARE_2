import { styled } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import {
  Container,
  Paper,
} from '@mui/material';

const StyledContainer = styled(Container)(({ theme }) => ({
  height: '100vh',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'var(--app-beige)',
}));

const CentralCard = styled(Paper)(({ theme }) => ({
  width: '80%',
  minWidth: 340,
  height: '80%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  gap: 10,
  padding: 20,
}));

const LogoImage = styled('img')(({ theme }) => ({
  width: 123,
  height: 123,
  marginBottom: 16,
}));

const Title = styled('span')(({ theme }) => ({
  color: 'var(--app-rosa)',
  fontSize: 30,
  fontWeight: 500,
  marginBottom: 10,
}));

const LoginForm = styled('form')(({ theme }) => ({
  width: '70%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 30,
}));

const InputData = styled('input')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 10,
}));

const SubmitButtonStyle = {
  textTransform: 'none',
  width: '80%',
  fontWeight: 600,
  borderRadius: 10,
  height: 44,
  fontSize: 18,
  color: 'white',
  backgroundColor: "green",
  margin: 10,
};

const PassForgot = styled(Link)(({ theme }) => ({
  color: 'var(--app-laranja)',
  fontSize: 16,
  fontWeight: 500,
  textDecoration: 'none',
}));

const UserCreate = styled(Link)(({ theme }) => ({
  color: 'var(--app-rosa)',
  fontSize: 16,
  fontWeight: 500,
  textDecoration: 'none',
}));


export {
    StyledContainer,
    CentralCard,
    LogoImage,
    Title,
    LoginForm,
    InputData,
    SubmitButtonStyle,
    PassForgot,
    UserCreate,
};

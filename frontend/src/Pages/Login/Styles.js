import { styled } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import {
  Container,
  Paper,
} from '@mui/material';

const StyledContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
}));

const CentralCard = styled(Paper)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    height: '70%',
    padding: 30,
    borderRadius: 20,
    gap: 30,
    backgroundColor: 'white',
}));

const LogoImage = styled('img')(({ theme }) => ({
    width: 130,
    height: 130,
    marginBottom: 10,
}));

const Title = styled('span')(({ theme }) => ({
  color: 'black',
  fontSize: 30,
  fontWeight: 500,
  marginBottom: 10,
}));

const LoginForm = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 14,
    width: '100%',
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

export {
    StyledContainer,
    CentralCard,
    LogoImage,
    Title,
    LoginForm,
    InputData,
    SubmitButtonStyle,
};
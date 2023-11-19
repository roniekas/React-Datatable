import './App.css';
import {
  Box, Button,
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography
} from "@material-ui/core";
import TextField from '@mui/material/TextField';
import {useEffect, useState} from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {LoginInitiate} from "./services/login";
import secureLocalStorage from "react-secure-storage";
import {useNavigate} from "react-router";


function App({history}) {
  const Swal = require('sweetalert2');
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  useEffect(() => {
    const isAuthenticated = secureLocalStorage.getItem('isAuthenticated');
    if(isAuthenticated){
      navigate('/data-table');
    }
  }, []);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUsernameChanged = (e) => {
    setUser(e.target.value);
  }

  const handlePasswordChanged = (e) => {
    setPassword(e.target.value);
  }

  const handleButtonLogin = () => {
    if (user === '' || password === '') {
      return Swal.fire({
        icon: "question",
        title: "Oops...",
        text: "Username Atau Password tidak boleh Kosong!",
      });
    }
    LoginInitiate({username: user, password}).then((res) => {
      if(res.data.code === 0){
        return Swal.fire({
          icon: "question",
          title: "Oops...",
          text: "Username Atau Password tidak dikenali!",
        });
      } else if(res.data.code === 1){
        secureLocalStorage.setItem("isAuthenticated", true);
        navigate('/data-table');
      }
    })
  }

return (
  <div className="App">
    <Box style={{
      backgroundColor: '#3c3f41',
      padding: '5vh',
      borderRadius: '20px',
      color: 'white',
      boxShadow: '0px 0px 5px #FFF',
      minWidth: '500px'
    }}>
      <Typography variant="h3" style={{margin: '0vh 0px 3vh'}}>
        LOGIN
      </Typography>
      <TextField
        id="filled-basic"
        label="Username"
        variant="filled"
        fullWidth sx={{marginBottom: '2vh'}}
        onChange={(e) => handleUsernameChanged(e)}
      />
      <FormControl sx={{m: 1, width: '50ch'}} fullWidth variant="filled">
        <InputLabel htmlFor="filled-adornment-password" color="secondary">Password</InputLabel>
        <FilledInput
          id="filled-adornment-password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => handlePasswordChanged(e)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff/> : <Visibility/>}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button
        variant="outlined" style={{marginTop: '2vh', width: '50%', backgroundColor: '#7d7e80'}}
        size="large"
        onClick={() => handleButtonLogin()}
      >
        {
          isLoading ? 'Loading ...' : 'Login'
        }
      </Button>
    </Box>
  </div>
)
  ;
}

export default App;

import {useState} from 'react'
import { Box,Container,TextField, Typography,Button,FormControl,FormHelperText} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import axios from '../api/api'
import { useAthuContext } from '../Context/AthuContext'
const NEW_PASSWORD_URL = '/Login/forgotenPassword/newPassword'
const RecoverPassword = () => {
  const {user} = useAthuContext()
  const [data,setData] = useState({Password:'',confirmPassword: ''})
  const [Errors, setErrors] = useState({Password:'', confirmPassword:''});
  const [errorMsg,setErrorMsg] = useState('')
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('')
    setErrorMsg('')
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        await axios.post(NEW_PASSWORD_URL,data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        })
          navigate("/login")
    } catch (err) {
        if (!err?.response) {
          setErrorMsg('Failde');
        } else if (err.response?.status === 409) {
          setErrorMsg(err.response.data.error);
        } else if (err.response?.status === 403){
          setErrorMsg('Failde')
        }
    }finally{
      setData('')
    }
    } else {
      setErrors(errors);
    }
  };
  const validateForm = () => {
    const formErrors = {};
    if (!data.Password) {
      formErrors.Password = 'Please enter new password';
    }

    if(!data.confirmPassword){
      formErrors.confirmPassword = 'Please confrim new password'
    }
    if( data.confirmPassword !== data.Password){
      formErrors.confirmPassword = 'Confrim password not match'
    }

    return formErrors;
  };
  return (
    <Box  sx={{display:'flex',alignItems:'flex-start',justifyContent:'center'}} >
    <Box sx={{marginTop:8,display: 'flex',flexDirection: 'column',alignItems: 'center',boxShadow:2, p:2,
      borderRadius: 3,width:{xs:'90%',md:'50%',lg:'30%'}}}>
        <Typography component="h1" variant="h5">Reset password</Typography>
    <Box component="form" onSubmit={handleSubmit}  noValidate sx={{ mt: 1 }}>
       <FormControl fullWidth error={!!Errors.Password}>
          <TextField color="secondary" onChange={handleChange}  margin="normal" required fullWidth type="password" id="password" label="New password" name="Password"/>
          <FormHelperText >{Errors.Password?Errors.Password:''}</FormHelperText>
       </FormControl>
       <FormControl fullWidth error={!!Errors.confirmPassword}>
          <TextField color="secondary" onChange={handleChange} margin="normal" required fullWidth type="password" id="confirmPassword" label="Confirm password" name="confirmPassword"/>
          <FormHelperText >{Errors.confirmPassword?Errors.confirmPassword:''}</FormHelperText>
       </FormControl>
        {errorMsg && <Typography sx={{color:"#DA0037"}}>{errorMsg}</Typography>}
        <Button type="submit" fullWidth  variant="contained" sx={{
                        textTransform:'none',
                        backgroundColor:'#16db82',
                        color:"#fff",
                        fontSize:'1.2em',
                        letterSpacing:'2px',
                        marginTop:'.5em',
                          ':hover':{
                         backgroundColor:'#16db82'
                        }}}>Next</Button>
    </Box>
   </Box>
</Box>
  )
}

export default RecoverPassword

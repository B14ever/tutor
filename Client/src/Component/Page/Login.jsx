import React,{useState} from 'react'
import { Box,Link,TextField,Typography,Avatar,Button,FormControl,FormHelperText} from '@mui/material'
import {useNavigate,useLocation} from 'react-router-dom'
import axios from '../api/api'
import {useAthuContext} from '../Context/AthuContext'
const LOGIN_URL = '/Login'
const Login = () =>  {
  const {dispatch} = useAthuContext()
  const [data,setData] = useState({Email:'',Password:''})
  const [Errors,setErrors] = useState({Email:'',Password:''})
  const [errorMsg,setErrorMsg] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
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
           const responce =  await axios.post(LOGIN_URL,data,
              {
                  headers: { 'Content-Type': 'application/json' },
                  withCredentials: true
              }
          )
          const {user,token} = responce.data
          localStorage.setItem('TOKEN',token)
          localStorage.setItem('USER_DATA',JSON.stringify(user))
          dispatch({ type: 'AUTHENTICATE', payload: {user,token}})
          navigate('/profile')
      } catch (err) {
          if (!err?.response) {
            setErrorMsg('Login Failde');
          } 
          if (err.response?.status === 404) {
            const token = err.response.data.token
            localStorage.setItem('TOKEN',token)
            navigate('/emailverification',{ state: { from: location } })
          }
          if (err.response?.status === 409) {
            setErrorMsg(err.response.data.error);
          } if (err.response?.status === 403){
            setErrorMsg('Login Failde')
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
      if (!data.Email) {
          formErrors.Email = 'Email required';
        } else if (!/^\S+@\S+\.\S+$/.test(data.Email)) {
          formErrors.Email = 'Invalid email format';
        }
        if (!data.Password) {
          formErrors.Password = 'password required';
        }   
      return formErrors;
  }
      return (
      <Box sx={{display:'flex',justifyContent:'center'}}>
        <Box sx={{marginTop: 8,display: 'flex',
       flexDirection: 'column',alignItems: 'center',
       boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
       p:3, width:{xs:'90%',md:'50%',lg:'30%'},borderRadius:'10px'}}>
          <Typography component="h1" variant="h5">Login</Typography>
      <Box component="form" onSubmit={handleSubmit}  noValidate sx={{ mt: 1,pl:2,pr:2,}}>
        <FormControl fullWidth error={!!Errors.Email}>
        <TextField onChange={handleChange} margin="normal" required fullWidth id="email" label="Email" name="Email" color="secondary"/>
        <FormHelperText>{Errors.Email?Errors.Email:''}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={!!Errors.Password}>
        <TextField onChange={handleChange}  margin="normal" required fullWidth name="Password" label="Password" color="secondary" type="password" id="password"/>
        <FormHelperText>{Errors.Password?Errors.Password:''}</FormHelperText>
        </FormControl>
        {errorMsg && <Typography sx={{color:"#DA0037"}}>{errorMsg}</Typography>}
        <Box sx={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <Box sx={{width:'100%',display:'flex'}}> 
            <Link  onClick={()=>navigate('/forgetPassword')} variant="body2" color='#16db82'>Forget password?</Link>
            <Link sx={{marginLeft:'auto',color:'#16db82'}} onClick={()=>navigate('/signup')} variant="body2">Create account</Link>
          </Box>
          <Button type="submit" variant="contained" size='large' sx={{ mt: 1, mb: 2,width:'50%',alignSelf:'center',textTransform:'none', backgroundColor:'#16db82',
                        color:"#fff",
                        fontSize:'1.5em',p:'1',':hover':{
                          backgroundColor:'#16db82'
                         }}}>Login</Button>
        </Box>
      </Box>
    </Box>
    </Box>
    )
  }
export default Login
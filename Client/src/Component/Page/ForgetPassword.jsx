import {useState}from 'react'
import { Box,Container,TextField, Typography,Button,FormControl,FormHelperText,Backdrop,CircularProgress} from '@mui/material'
import {useNavigate,useLocation} from 'react-router-dom'
import axios from '../api/api'
import { useAthuContext } from '../Context/AthuContext'
const FORGET_PASSWORD_URL = '/Login/forgotenPassword'
const ForgetPassword = () => {
  const {dispatch} = useAthuContext()
  const navigate = useNavigate()
  const location = useLocation()
  const [Email,setEmail] = useState('')
  const [Errors,setError] = useState('')
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        setOpen(true)
        const responce = await axios.post(FORGET_PASSWORD_URL,{Email},
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )
        localStorage.setItem('TOKEN',responce.data.token)
        dispatch({type:'AUTHENTICATE',payload: {user:null,token:responce.data.token}})
        setTimeout(()=>{setOpen(false),500})
        navigate("/emailVerification",{ state: { from: location } })
    } catch (err) {
        if (!err?.response) {
          setError('Server Error');
        } else if (err.response?.status === 409) {
          setError(err.response.data.error);
        }
    }finally{
      setEmail('')
    }
    } else {
      setError(errors);
    }
  };
  const validateForm = () => {
    let formErrors = '';
    if (!Email) {
         formErrors = 'Email required';
      } else if (!/^\S+@\S+\.\S+$/.test(Email)) {
        formErrors = 'Email is invalid';
      } 
    return formErrors;
}
  return (
    <Box  sx={{display:'flex',alignItems:'flex-start',justifyContent:'center'}} >
    <Box sx={{marginTop:8,display: 'flex',flexDirection: 'column',alignItems: 'center',boxShadow:2, p:2,
      borderRadius: 3,width:{xs:'90%',md:'50%',lg:'30%'}}}>
        <Typography component="h1" variant="h5">Reset password</Typography>
        <Typography>Enter email</Typography>
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
       <FormControl fullWidth error={!!Errors}>
        <TextField color="secondary" onChange={(e)=>setEmail(e.target.value)} margin="normal" required fullWidth id="Email" label="Email" name="Email"/>
        <FormHelperText >{Errors?Errors:''}</FormHelperText>
       </FormControl>
        <Button  type="submit" fullWidth  variant="contained" sx={{
                        textTransform:'none',
                        backgroundColor:'#16db82',
                        color:"#fff",
                        fontSize:'1.2em',
                        letterSpacing:'2px',
                        marginTop:'1em',
                          ':hover':{
                         backgroundColor:'#16db82'
                        }}} >Next</Button>
        <Box sx={{display:'flex',justifyContent:'center'}}>
         <Button onClick={()=>navigate('/login')} sx={{mt:1,color:"#16db82",textTransform:'none',fontSize:'1.2em',
                        letterSpacing:'2px',}}>Back</Button>
        </Box>
    </Box>
   </Box>
   <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
    </Backdrop>
</Box>
  )
}

export default ForgetPassword

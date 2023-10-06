import React,{useState} from 'react'
import {TextField,Box,Button,Typography,Backdrop,CircularProgress} from '@mui/material'
import { useAthuContext } from '../Context/AthuContext';
import { useNavigate,useLocation } from 'react-router-dom'
import axios from '../api/api';
const EmailVerification = () => {
  const token = localStorage.getItem('TOKEN')
  const navigate = useNavigate()
  const {user,dispatch} = useAthuContext()
  const location = useLocation();
  const prevLocation = location.state && location.state.from
 const [Code,setCode] = useState()
 const [error,setError] = useState('')
 const [open, setOpen] = useState(false);
 const handleClose = () => {
  setOpen(false);
};
 const HandleSubmit = async (e)=>{
  e.preventDefault();
  setError('')
  if(Code){
      try{
       const responce = await axios.post('/emailVerification',{Code},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            withCredentials: true,
          })
      setCode()
      if(prevLocation.pathname === '/signup'){
            const {user} = responce.data
            localStorage.setItem('USER_DATA',JSON.stringify(user))
            dispatch({ type: 'AUTHENTICATE', payload: {user,token}})
            navigate('/profile')
      }
      if(prevLocation.pathname === '/forgetPassword'){ 
         navigate("/RecoverPassword")  
      }
      if(prevLocation.pathname === '/login'){ 
        navigate("/login")  
     }
      }catch(err){
           if (!err?.response) {
              setError('Verification Failde');
            } else if (err.response?.status === 400) {
              setError(err.response.data.err);
            } 
      }
  }
  else{
      setError('wrong verification code')
  }
 }
 const ResendCode = async () =>{
     try{
      setError('')
      setCode('')
      setOpen(true)
      await axios.post('/emailVerification/RequestCode', null, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        withCredentials: true,
      })
      setTimeout(()=>{setOpen(false),500})
     }catch(err){
      if (!err?.response) {
        setError('Verification Failde');
      } else if (err.response?.status === 400) {
        setError(err.response.data.err);
      } 
     }
    }
  return (
    <Box  sx={{backgroundColor:'#fff',display:'flex',alignItems:'flex-start',justifyContent:'center'}} >
    <Box  sx={{marginTop:10,display: 'flex',flexDirection: 'column',alignItems: 'center',boxShadow:2, p:5,
      borderRadius: 3,width:{xs:'90%',lg:'30%'}}}>
        <Typography component="h1" variant="h5">Verify email</Typography>
        <Box component="form"   onSubmit={HandleSubmit} onChange={(e)=>setCode(e.target.value)} noValidate sx={{ mt: 1 }}>
        <TextField margin="normal" required fullWidth id="code" label='Enter Verification code' value={Code} color="secondary"  name="code"/>
        {error && <Typography sx={{color:"#DA0037"}}>{error}</Typography>}
        <Button type="submit" fullWidth  variant="contained" sx={{ mt: 3, mb: 2,backgroundColor:'#16db82',
                color:"#fff",':hover':{
                  backgroundColor:'#16db82'
                }}}>Verify</Button>
         <Typography variant='body2'>Didn't receive code <Button sx={{textTransform:'none',color:'#16db82'}} onClick={ResendCode}>Resend code</Button></Typography>
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

export default EmailVerification
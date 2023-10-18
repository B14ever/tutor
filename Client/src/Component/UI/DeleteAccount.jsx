import React,{useState} from 'react'
import {Box,TextField,FormHelperText,FormControlLabel,Checkbox,Button,Divider,Alert} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import { useAthuContext } from '../Context/AthuContext'
import axios from '../api/api'
const DeleteAccount = () => {
    const {user} = useAthuContext()
    const [data,setData] = useState({Password:''})
    const [Errors,setErrors] = useState({Password:''})
    const [errorMsg,setErrorMsg] = useState('')
    const [checkbox,setCheckbox] = useState(false)
    const navigate = useNavigate()
    const handleDelete = async (e) =>{
      e.preventDefault()
      setErrorMsg('')
      setErrors('')
      const errors = validateForm()
      if (Object.keys(errors).length === 0) {
        try {
          await axios.post('/AccountProfile/deleteAccount',data,{
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            withCredentials: true,
          })
          setData('')
          localStorage.removeItem('TOKEN')
          localStorage.removeItem('USER_DATA')
          navigate('/')
          } catch (err) {
             if (!err?.response) {
               setErrorMsg('Failde');
             } else if (err.response?.status === 404) {
               setErrorMsg(err.response.data.error);
             } else if (err.response?.status === 403){
               setErrorMsg(err.response.data.error)
             }
         }
       } else {
          setErrors(errors);
         }
    }
    const validateForm =()=>{
      const formsErrors ={}
      if(!data.Password){
        formsErrors.Password = 'Please Enter Password'
      }
    return formsErrors
    }
  return (
   <React.Fragment>
     <Divider  sx={{marginTop:'5px',}}>Delete account</Divider>
     <Box component='form' onSubmit={handleDelete} sx={{display:'flex',flexDirection:'column',gap:'.5rem',alignItems:'center'}}mt={2}ml={2}mr={2}>
      <TextField sx={{width:{xs:'100%',md:'50%'}} } type='password' label="Password"  onChange={(e)=>setData({Password:e.target.value})}/>
      <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}>{Errors.Password?Errors.Password:''}</FormHelperText>
      <FormControlLabel sx={{width:{xs:'100%',md:'50%'}} }
                  control={<Checkbox value="allowExtraEmails" color="primary" onClick={()=>setCheckbox(!checkbox)} />}
                  label="Agree to delete account"
                />
      {errorMsg?<Alert severity='error' sx={{width:{xs:'100%',md:'50%'}}}>{errorMsg}</Alert>:''}
      <Box sx={{width:{xs:'100%',md:'50%'},display:'flex',justifyContent:'flex-end'}}>
        <Button variant="outlined" type="submit"  disabled={!checkbox}  size='large'
         sx={{ mb:2,width:{xs:'100%',sm:'50%'}}} color="error">Delete Account</Button></Box>
    </Box>
   </React.Fragment>
    
  )
}

export default DeleteAccount

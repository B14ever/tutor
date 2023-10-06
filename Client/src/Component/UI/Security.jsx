import React, { useState} from 'react'
import { Box,TextField,FormHelperText,Button,Divider,Typography,Alert} from '@mui/material'
import { useAthuContext } from '../Context/AthuContext'
import axios from '../api/api'
import DeleteAccount from './DeleteAccount'
const Security = () => {
  const {user} = useAthuContext()
  const [data,setData] = useState({Password:'',newPassword:'',confirmPassword:''})
  const [Errors,setErrors] = useState({Password:'',newPassword:'',confirmPassword:''})
  const [errorMsg,setErrorMsg] = useState('')
  const [success,setSuccess] = useState(false)
  const handleChange = (e) =>{
    const {name,value} = e.target
    setData({...data,[name]:value})
  }
  const handleSubmit = async (e) =>{
    e.preventDefault()
    setErrorMsg('')
    setErrors('')
    const errors = validateForm()
    if (Object.keys(errors).length === 0) {
      try {
       const responce = await axios.post('/AccountProfile/ChangePassword',data,{
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        })
        setSuccess(true)
        setData('')
        } catch (err) {
           if (!err?.response) {
            setSuccess(false)
             setErrorMsg('PasswordChangeFaildTryAgain');
           } else if (err.response?.status === 409) {
             setSuccess(false)
             setErrorMsg(err.response.data.error);
           } else if (err.response?.status === 403){
             setSuccess(false)
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
      formsErrors.Password = 'PleaseEnterOldPassword'
    }
    if(!data.newPassword){
      formsErrors.newPassword = 'PleaseEnterNewPassword'
    }
    if(!data.confirmPassword){
      formsErrors.confirmPassword = 'PleaseConfrimNewPassword'
    }
    if( data.confirmPassword !== data.newPassword){
      formsErrors.confirmPassword = 'ConfrimPassworNotMatch'
    }
  return formsErrors
  }
  return (
      <React.Fragment>
       <Divider  sx={{marginTop:'20px'}}>Change Password</Divider>
      <Box component="form" onSubmit={handleSubmit} sx={{display:'flex',flexDirection:'column',gap:'.2rem',alignItems:'center'}}mt={2}ml={2}mr={2}>
      <TextField sx={{width:{xs:'100%',md:'50%'}} } value={data.Password || ''} onChange={handleChange} label="Old Password" type='password' name="Password" />
      <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}>{Errors.Password?Errors.Password:''}</FormHelperText>
      <TextField sx={{width:{xs:'100%',md:'50%'}}} value={data.newPassword || ''} onChange={handleChange} label="New Password" type='password' name="newPassword" />
      <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}>{Errors.newPassword?Errors.newPassword:''}</FormHelperText>
      <TextField sx={{width:{xs:'100%',md:'50%'}}} value={data.confirmPassword || ''} onChange={handleChange} label="Confirm Password" type='password' name="confirmPassword"/>
      <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}>{Errors.confirmPassword?Errors.confirmPassword:''}</FormHelperText>
      {success?<Alert severity='info' sx={{width:{xs:'100%',md:'50%'}}}>Password Changed</Alert>:''}
      {errorMsg?<Alert severity='error' sx={{width:{xs:'100%',md:'50%'}}}>{errorMsg}</Alert>:''}
      <Box sx={{width:{xs:'100%',md:'50%'},display:'flex',justifyContent:'flex-end'}}>
        <Button type="submit"  variant="contained" size='large' 
        sx={{width:{xs:'100%',sm:'50%'},
        textTransform:'none',
        backgroundColor:'#16db82',
        color:"#fff",
        ':hover':{
         backgroundColor:'#16db82'
        } }}>Save</Button>
      </Box>
      </Box>
      <DeleteAccount/>
      </React.Fragment>
  )
}

export default Security

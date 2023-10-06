import React,{useEffect, useState} from 'react'
import { Box,TextField,Snackbar,Backdrop,CircularProgress,Alert,FormHelperText,Divider, Grid,Button,Select,MenuItem,InputLabel} from '@mui/material'
import { useAthuContext } from '../Context/AthuContext'
import axios from '../api/api'
const AccountPerference = () => {
  const {user,dispatch} = useAthuContext()
  const [data,setData] = useState({FirstName:`${user.user.FirstName}`,LastName:`${user.user.LastName}`,Age:`${user.user.Age}`,
  Gender:`${user.user.Gender}`,Email:`${user.user.Email}`,PhoneNumber:`${user.user.PhoneNumber}`,City:`${user.user.City}`})
  const [Errors, setErrors] = useState({FirstName:false,LastName:false,Age:false,Gender:false,PhoneNumber:false,City:false});
  const [open, setOpen] = useState(false);
  const [warnnig,setWaring] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors({...Errors,[name]:false})
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleError = (e)=>{
    const {name,value} = e.target
    if(!value){
      setErrors({...Errors,[name]:true})
    }
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
          try{
            setOpen(true)
            const responce = await axios.post('/AccountProfile',data)
            localStorage.setItem('USER_DATA',JSON.stringify(responce.data.user))
            dispatch({type:"AUTHENTICATE",payload:{user:responce.data.user,token:localStorage.getItem('TOKEN')}})
            setTimeout(()=>{setOpen(false)},500)
          }
          catch(err){
            setOpen(false)
            setWaring(true)
          }
  }
  const isDisabled = Errors.FirstName || Errors.LastName || Errors.City || Errors.Country || Errors.PhoneNumber
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{display:'flex',flexDirection:'column',gap:'.5rem'}}mt={2}ml={2}mr={2}>
       <Grid spacing={1} container >
        <Grid item sm={6} xs={12}>
         <TextField  onChange={handleChange} onBlur={handleError} name='FirstName' color="secondary"
          label='First Name' defaultValue={user.user.FirstName} fullWidth />
        <FormHelperText sx={{color:'red'}}>{Errors.FirstName?"First Name required":''}</FormHelperText> 
        </Grid>
        <Grid item sm={6} xs={12}>
         <TextField  onChange={handleChange} onBlur={handleError} name='LastName'  color="secondary"
         label='Last Name' defaultValue={user. user.LastName} fullWidth />
        <FormHelperText sx={{color:'red'}}>{Errors.LastName?"Last Name required":''}</FormHelperText>
        </Grid>
       </Grid>
       <Grid spacing={1} mt={1} container >
        <Grid item sm={6} xs={12}>
         <TextField  onChange={handleChange} onBlur={handleError} name='Age' color="secondary"
          label='Age' defaultValue={user.user.Age} fullWidth />
        <FormHelperText sx={{color:'red'}}>{Errors.Age?"Age required":''}</FormHelperText> 
        </Grid>
        <Grid item sm={6} xs={12}>
        
                <Select fullWidth onChange={handleChange} defaultValue={user.user.Gender} name='Gender' 
                labelId="demo-select-small-label"  label='Gender'>
                      <MenuItem value='Male' >Male</MenuItem>
                      <MenuItem value='Female' >Female</MenuItem>
                </Select>
          <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}>{Errors.Gender? "Gender is required" : ''}</FormHelperText>
        </Grid>
       </Grid>
       <Grid spacing={1} mt={1} container>
         <Grid  sm={6} xs={12} item>
         <TextField  onChange={handleChange} onBlur={handleError} name='PhoneNumber'  color="secondary"
         label='Phone' defaultValue={user.user.PhoneNumber} fullWidth />
         <FormHelperText sx={{color:'red'}}>{Errors.PhoneNumber?"Phone number required":''}</FormHelperText> 
         </Grid>
         <Grid sm={6} xs={12} item>
         <TextField  onChange={handleChange} onBlur={handleError} name='City'  label='City' color="secondary"
            defaultValue={user.user.City} fullWidth />
        <FormHelperText sx={{color:'red'}}>{Errors.City?"City name requiered":''}</FormHelperText>
         </Grid>
       </Grid>
      <Box sx={{display:'flex',justifyContent:{sm:'flex-end',xs:'center'}}}>
      <Button type="submit" disabled={isDisabled} variant="contained" size='large' 
         sx={{ mt: 2, mb: 2,textTransform:'none',
         backgroundColor:'#16db82',
         color:"#fff",width:{xs:'100%',sm:'25%'},
         ':hover':{
          backgroundColor:'#16db82'
         } }}>Save</Button>
     </Box>
     <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar open={warnnig} anchorOrigin={{ vertical:'top', horizontal:'center'}}
                autoHideDuration={3000} onClose={()=>setWaring(false)}>
              <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
                Error
              </Alert>
        </Snackbar>
    </Box>
  )
}

export default AccountPerference


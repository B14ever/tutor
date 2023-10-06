import React,{useEffect, useState} from 'react'
import {TextField,FormControl,FormHelperText,Grid,Box,Button,MenuItem, Select, InputLabel} from '@mui/material'
import { useFormContext } from '../Context/Form'
import { useAthuContext } from '../Context/AthuContext'
const PersonalInfo = () => {
     const {dispatch,user} = useAthuContext()
    const {SetFormStage,FormStage} = useFormContext()
    const [data,setData] = useState({FirstName:user?.user?.FirstName,LastName:user?.user?.LastName,Age:user?.user?.Age,
                                    Gender:user?.user?.Gender,City:user?.user?.City,Email:user?.user?.Email,
                                  PhoneNumber:user?.user?.PhoneNumber,Password:user?.user?.Password, confirmPassword:user?.user?.confirmPassword})
    const [Errors, setErrors] = useState({FirstName:'',LastName:'',Age:'',Gender:'',City:'',Email:'',PhoneNumber:'',Password:'', confirmPassword:''});
    const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
      setErrors({...Errors,[name]:''})
    };
    const handleNext = (e) => {
      e.preventDefault();
      setErrors('')
      const errors = validateForm();
      if (Object.keys(errors).length === 0) {
        localStorage.setItem('USER_DATA',JSON.stringify(data))
        dispatch({type:'AUTHENTICATE',payload: {user:data,token:null}})
        SetFormStage((prev) => prev + 1)
      } else {
        setErrors(errors);
      }
    };
    const validateForm = () => {
      const formErrors = {};
      if (!data.FirstName) {
        formErrors.FirstName = 'First Name rqeuired';
      }
  
      if (!data.LastName) {
        formErrors.LastName = 'Last Name rqeuired';
      }
  
      if (!data.Age) {
        formErrors.Age = 'Age is rqeuired';
      }
      if (!data.Gender) {
        formErrors.Gender = 'Select gender';
      }
  
      if (!data.City) {
        formErrors.City = 'City is required';
      }
  
      if (!data.Email) {
        formErrors.Email = 'Email is required';
      } else if (!/^\S+@\S+\.\S+$/.test(data.Email)) {
        formErrors.Email = 'InvalidEmail';
      }
  
      if (!data.PhoneNumber) {
        formErrors.PhoneNumber = 'Phone number required';
      }
  
      if (!data.Password) {
        formErrors.Password = 'Password required';
      }
  
      if (!data.confirmPassword) {
        formErrors.confirmPassword = 'Please confrim  password';
      } else if (data.confirmPassword !== data.Password) {
        formErrors.confirmPassword = 'Confrim password does not  match';
      }
  
      return formErrors;
    };
    return (
     <Box sx={{
        marginTop:'1em',
        width:'100%',
     }}>
        <Grid container spacing={1.5}>
          <Grid item xs={12} md={6}>
          <FormControl fullWidth>
                <TextField onChange={handleChange} defaultValue={user.user?.FirstName}  fullWidth label='First Name' name="FirstName" color="secondary"/>
                <FormHelperText sx={{color:'red'}}>{Errors.FirstName? Errors.FirstName : ''}</FormHelperText> 
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
          <FormControl fullWidth>
                <TextField onChange={handleChange} defaultValue={user.user?.LastName} fullWidth label='Last Name' name='LastName' color="secondary"/>
                <FormHelperText sx={{color:'red'}}>{Errors.LastName? Errors.LastName : ''}</FormHelperText> 
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={1.5} sx={{marginTop:'.5em'}} >
          <Grid item xs={6}>
          <FormControl fullWidth>
                <TextField onChange={handleChange} defaultValue={user.user?.Age} fullWidth label='Age' name='Age' color="secondary"/>
                <FormHelperText sx={{color:'red'}}>{Errors.Age? Errors.Age : ''}</FormHelperText> 
            </FormControl>
          </Grid>
          <Grid item xs={6}>
          <FormControl  fullWidth>
               <InputLabel id="demo-select-small-label">Gender</InputLabel>
                <Select onChange={handleChange} defaultValue={user.user?.Gender} name='Gender' labelId="demo-select-small-label"
                       
                      label='Gender'>
                      <MenuItem value='Male' >Male</MenuItem>
                      <MenuItem value='Female' >Female</MenuItem>
                </Select>
          <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}>{Errors.Gender? Errors.Gender : ''}</FormHelperText>
        </FormControl>
          </Grid>
          <Grid item xs={12}>
          <FormControl fullWidth>
                <TextField onChange={handleChange} defaultValue={user.user?.City} fullWidth label='City' name='City' color="secondary"/>
                <FormHelperText sx={{color:'red'}}>{Errors.City? Errors.City : ''}</FormHelperText> 
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={1.5} sx={{marginTop:'.5em'}} >
          <Grid item xs={12} md={6}>
          <FormControl fullWidth>
                <TextField onChange={handleChange} defaultValue={user.user?.Email} name='Email' fullWidth label='Email' color="secondary"/>
                <FormHelperText sx={{color:'red'}}>{Errors.Email? Errors.Email : ''}</FormHelperText> 
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
          <FormControl fullWidth>
                <TextField onChange={handleChange} name='PhoneNumber' defaultValue={user.user?.PhoneNumber} fullWidth label='Phone Number' color="secondary"/>
                <FormHelperText sx={{color:'red'}}>{Errors.PhoneNumber? Errors.PhoneNumber : ''}</FormHelperText> 
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={1.5} sx={{marginTop:'.5em'}} >
          <Grid item xs={12} md={6}>
          <FormControl fullWidth>
                <TextField onChange={handleChange} name='Password' defaultValue={user.user?.Password} fullWidth label='Password' color="secondary"/>
                <FormHelperText sx={{color:'red'}}>{Errors.Password? Errors.Password : ''}</FormHelperText> 
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
          <FormControl fullWidth>
                <TextField onChange={handleChange} name='confirmPassword' defaultValue={user.user?.confirmPassword} fullWidth label='Confirm Password' color="secondary"/>
                <FormHelperText sx={{color:'red'}}>{Errors.confirmPassword?Errors.confirmPassword:''}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{textAlign:'right'}}>
           <Button sx={{   textTransform:'none',
                        backgroundColor:'#16db82',
                        color:"#fff",
                        fontSize:'1.5em',
                        letterSpacing:'2px',
                        fontWeight:'300',
                        marginTop:'1em',
                        width:'6em',
                          ':hover':{
                         backgroundColor:'#16db82'
                        }}}  variant='contained' onClick={handleNext}>Next</Button>
        </Box>
     </Box>
  )
}

export default PersonalInfo
import React, { useState } from 'react'
import {TextField,FormControl,FormHelperText,Grid,Box,Button,MenuItem, Select, InputLabel} from '@mui/material'
import { useFormContext } from '../Context/Form'
import { useNavigate,useLocation } from 'react-router-dom'
import { useAthuContext } from '../Context/AthuContext'
import axios from '../api/api'
const EducationLevel = () => {
    const {dispatch,user} = useAthuContext()
    const [educationalInfo,setEducationalInfo] = useState({Educational_Level:user?.user?.Educational_Level,
                                                            School:user?.user?.School,
                                                            FieldOfStudy:user?.user?.FieldOfStudy,
                                                            Language:user?.user?.Language})
     const [Errors, setErrors] = useState({Educational_Level:'',School:'',FieldOfStudy:'',Language:''})
     const [errorMsg,setErrorMsg] = useState('')
     const User = JSON.parse(localStorage.getItem('USER_DATA'))
    const navigate = useNavigate()
    const location = useLocation()
    const {SetFormStage} = useFormContext()

    const handleChange = (e) => {
      const { name, value } = e.target;
      setEducationalInfo({ ...educationalInfo, [name]: value });
      setErrors({...Errors,[name]:''})
    };
    const handleSubmit =   async (e) => {
      e.preventDefault();
      setErrors('')
      const errors = validateForm();
      if (Object.keys(errors).length === 0) {
        try {
          const Full_User_Information = {...User,...educationalInfo}
          const responce =  await axios.post('/AccountSignup',Full_User_Information,
             {
                 headers: { 'Content-Type': 'application/json' },
                 withCredentials: true
             }
         )
           localStorage.setItem('TOKEN',responce.data.token)
           localStorage.setItem('USER_DATA',JSON.stringify(Full_User_Information))
           dispatch({type:'AUTHENTICATE',payload: {user:{Full_User_Information},token:responce.data.token}})
           navigate("/emailverification",{ state: { from: location } })
     } catch (err) {
         if (!err?.response) {
           setErrorMsg('Registartion Failde');
         } else if (err.response?.status === 409) {
           setErrorMsg(err.response.data.error);
         } else if (err.response?.status === 403){
           setErrorMsg('Registartion Failde')
         }
     }
     } else {
       setErrors(errors);
     }
    };
    const validateForm = () => {
      const formErrors = {};
      if (!educationalInfo.Educational_Level) {
        formErrors.Educational_Level = 'Enter educational level';
      }
  
      if (!educationalInfo.School) {
        formErrors.School = 'Enter shool';
      }
  
      if (!educationalInfo.FieldOfStudy) {
        formErrors.FieldOfStudy = ' Enter field of study';
      }
      if (!educationalInfo.Language) {
        formErrors.Language = 'Enter language';
      }  
      return formErrors;
    };
    return (
       <Box component="form" onSubmit={handleSubmit} sx={{
          marginTop:'1em',
          width:'100%',
       }}>
          <Grid container spacing={1.5}>
            <Grid item xs={12} md={6}>
            <FormControl  fullWidth>
                 <InputLabel id="demo-select-small-label">Educational level</InputLabel>
                  <Select onChange={handleChange} labelId="demo-select-small-label"
                          name='Educational_Level'
                          defaultValue={user?.user?.Educational_Level}
                          label='Educational Level'>
                        <MenuItem value='High School' >High School</MenuItem>
                        <MenuItem value='Dgree' >Dgree</MenuItem>
                        <MenuItem value='Masters' >Masters</MenuItem>
                  </Select>
            <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}></FormHelperText>
          </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
            <FormControl fullWidth>
                  <TextField onChange={handleChange}  defaultVallue={user?.user?.School} name='School' fullWidth label='Shcool name' color="secondary"/>
                  <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={1.5} sx={{marginTop:'.5em'}} >
            <Grid item xs={12} md={6}>
            <FormControl fullWidth>
                  <TextField onChange={handleChange} defaultValue={user?.user?.FieldOfStudy} name='FieldOfStudy' fullWidth label='Field of study' color="secondary"/>
                  <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
            <FormControl fullWidth>
                  <TextField onChange={handleChange} defaultValue={user?.user?.Language} name='Language' fullWidth label='Language' color="secondary"/>
                  <FormHelperText></FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Box >
             <Button sx={{ textTransform:'none',
                          borderColor:'#16db82',
                          color:"#16db82",
                          fontSize:'1.5em',
                          letterSpacing:'2px',
                          fontWeight:'300',
                          marginTop:'1em',
                          float:'left',
                          width:'3em',
                            ':hover':{
                           borderColor:'#16db82',
                           backgroundColor:'#fff'
                          }}}  variant='outlined' onClick={()=>SetFormStage((prev)=>prev - 1)}>Back</Button>
            <Button sx={{   textTransform:'none',
                backgroundColor:'#16db82',
                color:"#fff",
                fontSize:'1.5em',
                letterSpacing:'2px',
                fontWeight:'300',
                marginTop:'1em',
                float:'right',
                width:'6em',
                ':hover':{
                backgroundColor:'#16db82'
                }}}  variant='contained'type="submit">Submit</Button>
          </Box>
       </Box>
  )
}

export default EducationLevel
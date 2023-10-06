import React from 'react'
import { Box,Typography,Divider} from '@mui/material'
import PersonalInfo from '../UI/PersonalInfo'
import EducationLevel from '../UI/EducationLevel'
import { useFormContext } from '../Context/Form'

const SignUp = () => {
  const {FormStage} = useFormContext()
  return (
    <Box sx={{
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    }}>
        <Box sx={{
            marginTop:'3em',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
            width:'90%',
            padding:'2em',
            marginBottom:'1.5em'
            
        }}>
           <Box sx={{
             textAlign:'center',
           }}>
             <Typography variant='h3' sx={{
              color:'#16db65'
              ,letterSpacing:'3px',
              fontWeight:'400',
              fontSize:'2em'
              }}>Sign Up</Typography>
           </Box>
           <Divider sx={{marginTop:'1em',backgroundColor:'#16db65'}}/>
            {
              FormStage === 0 ? 
              <PersonalInfo/> :
            <EducationLevel/>}
        </Box>
    </Box>
  )
}

export default SignUp
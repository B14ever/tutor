import React from 'react'
import {Avatar, Box, Typography} from '@mui/material'
const About = () => {
  return (
    <Box sx={{width:'100%',display:'flex',justifyContent:'center'}}>
       <Box sx={{marginTop: 6,display:{sm:'flex'},gap:'1rem',
        p:1, width:{xs:'90%',md:'50%',lg:'60%'},borderRadius:'10px'}}>
          <Typography variant='h3' sx={{textAlign:'center',display:{xs:'block',sm:'none',fontWeight:'400'}}}>About Us</Typography>
          <img  style={{height:'200px',width:'100%',objectFit:'contain'}} src={'../teacher-student.jpg'}/>
          <Box>
          <Typography variant='h3' sx={{display:{xs:'none',sm:'block',fontWeight:'400'}}}>About Us</Typography>
            <Typography  sx={{fontWeight:'300',marginTop:'1em',textWrap:'balance',fontSize:'1.3em',textAlign:{xs:'center',sm:'left'}}}>
              Welcome to a website that connects tutors with families.
              If you are looking for a tutor who is dedicated to helping your child succeed, then this 
              is the right place for you. Contact us today to learn more about our services and to schedule a free consultation!
            </Typography>
          </Box>
       </Box>
    </Box>
  )
}

export default About
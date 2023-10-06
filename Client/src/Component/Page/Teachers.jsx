import React from 'react'
import { Box, Typography,Grid} from '@mui/material'
import ProfilePhotoBox from '../UI/ProfilePhotoBox'
import { useAthuContext } from '../Context/AthuContext'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import SchoolIcon from '@mui/icons-material/School';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { styled, useTheme } from '@mui/material/styles';
const User_Info = styled('Box')(({ theme }) => ({
  fontSize:'1.2em',
  fontWeight:'300',
  letterSpacing:'.6px'
}));
const Teachers = () => {
  const {user} = useAthuContext()
  return (
    <Box sx={{
      width:'100%',
      display:'flex',
      mt:5,
      justifyContent:'center'
    }}>
     <Box sx={{display: 'flex',
       flexDirection: 'column',alignItems: 'center',
       boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
       width:{xs:'90%',md:'50%',lg:'40%'},borderRadius:'10px'}}>
       <ProfilePhotoBox/>
       <Grid container mt={8} pl={2} pr={2}>
        <Grid item xs={12} sx={{textAlign:'center'}} >
            <Typography sx={{fontSize:'1.5em',
                             fontWeight:'600',
                             letterSpacing:'.8px'}}>{user.user.FirstName} {user.user.LastName}</Typography>
                             
        </Grid>
        <Grid item xs={12} sm={6} mt={2} sx={{display:'flex',alignItems:'center',gap:'.2em'}}>
        <SchoolIcon sx={{color:'#16db55',}}/>
        <User_Info> {user.user.FieldOfStudy}</User_Info>
        </Grid>
        <Grid item xs={12} sm={6} mt={2} sx={{display:'flex',alignItems:'center',gap:'.2em'}}>
        <ApartmentIcon sx={{color:'#16db55',}}/>
        <User_Info>{user.user.School}</User_Info>
        </Grid>
        <Grid item xs={12} sm={6} mt={2} sx={{display:'flex',alignItems:'center',gap:'.2em'}}>
        <PhoneAndroidIcon sx={{color:'#16db55',}}/>
        <User_Info> {user.user.PhoneNumber}</User_Info>
        </Grid>
        <Grid item xs={12} sm={6} mt={2} sx={{display:'flex',alignItems:'center',gap:'.2em'}}>
        <EmailIcon sx={{color:'#16db55',}}/>
        <User_Info>{user.user.Email}</User_Info>
        </Grid>
        <Grid item xs={12} sm={6} mt={2} sx={{display:'flex',alignItems:'center',gap:'.2em'}}>
        <FmdGoodIcon sx={{color:'#16db55',}}/>
        <User_Info>{user.user.City}</User_Info>
        </Grid>
       </Grid>
     </Box>
    </Box>
  )
}

export default Teachers
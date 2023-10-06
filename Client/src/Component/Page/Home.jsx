import React from 'react'
import { Typography,Box,Button} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
const HeroSection = styled('Box')(({ theme }) => ({
  display:'flex',
  flexDirection:'column-reverse',
  padding:'4px 8px',
  width:'98%',
  alignItems:'center',
  [theme.breakpoints.up('md')]: {
    width:'90%',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
}));
const Heading_Text = styled('Box')(({ theme }) => ({
   padding:'2em',
  [theme.breakpoints.up('md')]: {
    padding:'6em'
  },
}));
const Footer_Text = styled('Box')(({ theme }) => ({
   width:'100%',
   height: "10em",
   backgroundImage: "url('../wave.png')",
   backgroundSize:'cover',
   textAlign:'center',
   backgroundRepeat:'no-repeat',
  
  
}));
const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <HeroSection>
        <Heading_Text>
        <Typography variant='h3' sx={{textAlign:'balance',fontWeight:'400',lineHeight:'1.2',letterSpacing:'-1px',textWrap:'balance'}}>
        Find the perfect home teacher for your child
        </Typography>
        <Typography sx={{color:'#555',fontWeight:'9',marginTop:'1em',textWrap:'balance'}}>
           we believe that every child deserves access to a quality education, regardless of their circumstances.
          That's why we offer a wide range of home tutoring services, tailored to the individual needs of each student.
        </Typography>
        <Button variant='contained' sx={{textTransform:'none',
                                       backgroundColor:'#16db65',
                                       width:'10em',
                                       fontSize:'1.5em',
                                       letterSpacing:'5px',
                                       fontWeight:'400',
                                       marginTop:'1em',
                                       ':hover':{
                                        backgroundColor:'#1CAC78'
                                       }}}
                                       onClick={()=>navigate('/findTeacher')}>Find a Teacher</Button>
        </Heading_Text>
        <img  style={{height:'300px',width:'100%',objectFit:'contain'}} src={'../homework.jpg'}/>
      </HeroSection>
      <Box
       sx={{
        width:'100%',
        backgroundColor:'#16db65',
        color:'#fff',
        padding:'2em',
        height:'fit-content',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        
        
      }}>
         <Typography  variant='h4' sx={{
                                    textAlign:'center',
                                    fontWeight:'400',
                                    lineHeight:'.9',
                                    letterSpacing:'-1px',
                                    textWrap:'balance'}}>Give Home Lessons and Make a Difference
                                    </Typography>
        <Box sx={{textAlign:'center'}}>
        <Typography sx={{fontWeight:'300',marginTop:'1em',textWrap:'balance',fontSize:'1.3em'}}>
        Great way to make a difference in the lives of students in your community
        and earn some extra money at the same time. <br /> Sign up today!
         </Typography>
        </Box>
         <Button variant='contained' sx={{
                                       textTransform:'none',
                                       backgroundColor:'#16db82',
                                       color:"#fff",
                                       width:'10em',
                                       fontSize:'1.5em',
                                       letterSpacing:'2px',
                                       fontWeight:'300',
                                       marginTop:'.5em',
                                       ':hover':{
                                        backgroundColor:'#16db82'
                                       }}}
                                       onClick={()=>navigate('/signup')}>Sign up</Button>
      </Box>
    </>
    
  )
}

export default Home
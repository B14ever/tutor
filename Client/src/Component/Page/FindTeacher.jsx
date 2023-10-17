import React,{useEffect,useState} from 'react'
import { Box,Typography,Divider,LinearProgress,Grid,Avatar,Button,Alert,Snackbar,InputBase} from '@mui/material/node'
import { styled,alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import SchoolIcon from '@mui/icons-material/School';
import axios from '../api/api'
const User_Info = styled('Typography')(({ theme }) => ({
  fontSize:'1.2rem',
  fontWeight:'300',
  letterSpacing:'.6px',
  color:'#000'
}));
const Photos = styled(Avatar)(({ theme }) => ({
   width:'150px',
   height:"150px",
   
}));
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor:'#E7EBF0',
  '&:hover': {
    backgroundColor:'#E7EBF0',
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '50%',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '25ch',
    },
  },
}));
const FindTeacher = () => {
    const [loading,setLoading] = useState(false)
    const [people,setPeople] = useState([{_id:'',FirstName:'',LastName:'',City:''}])
    const [search,setSearch] = useState('')
  useEffect(() => {
      const GetData = async ()=>{
      try{
      setLoading(true)
      const responce = await axios.post(`/teachers`)
      const data = responce.data.Teachers
      console.log(data)
      setPeople(data)
      setTimeout(()=>{setLoading(false)},1200)
      }
      catch(err){
          console.error(err)
      }
  }
      GetData()
      .catch(console.error);
  }, [])
  return (
    <Box p={2} sx={{borderRadius:'6px',display:'flex',
                    alignItems:'center',justifyContent:'center'}}>
      {loading?
      <Box sx={{marginTop:'3em',
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
            width:'95%',
            padding:'2em',
            marginBottom:'1.5em',textAlign:'center'}}>
        <LinearProgress color='secondary' />
      </Box>:
      <Box sx={{ marginTop:'3em',
                width:'95%',
                marginBottom:'1.5em',display:'flex',flexDirection:'column'}}>
         <Grid container spacing={1}>
           <Grid item xs={12} sm={6} mb={1} >
            <Search onChange={(e)=>setSearch(e.target.value)}>
              <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
              <StyledInputBase placeholder="Name , Location" inputProps={{ 'aria-label': 'search' }}/>
            </Search>
           </Grid>
         </Grid>
        <Divider/>
        <Grid mt={2} container spacing={4}>
          {people.filter(item=>{
                   return item.FirstName.toLowerCase().includes(search.toLowerCase()) ||  item.City.toLowerCase().includes(search.toLowerCase())
                }).map((item,index)=>
          <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
             <Box sx={{ borderRadius:'10px', boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',padding:'1em',}}>
              <Box sx={{width:'100%',display:'flex',justifyContent:'center'}}>
              <Photos src={item.profilePhoto}/>
              </Box>
              <Box mt={2} >
                <Typography variant='h5' sx={{textAlign:'center',
                                               fontWeight:'400',
                                               letterSpacing:'1.5px'}}>{item.FirstName} {item.LastName}</Typography>
                 <Box sx={{display:'flex',alignItems:'center',gap:'1em'} }mt={1}>
                  <SchoolIcon sx={{color:'#16db55',}}/>
                 < User_Info >{item.FieldOfStudy}</ User_Info>
                 </Box>
                 <Box sx={{display:'flex',alignItems:'center',gap:'1em'} }mt={1}>
                 <FmdGoodIcon sx={{color:'#16db55',}}/>
                 < User_Info>{item.City}</User_Info>
                </Box>
                <Box sx={{display:'flex',alignItems:'center',gap:'1em'} }mt={1}>
                <PhoneAndroidIcon sx={{color:'#16db55',}}/>
                 <User_Info> {item.PhoneNumber}</User_Info>
                </Box>
              </Box> 
             </Box>      
                          
          </Grid>
           )}
        </Grid>
      </Box>}
    </Box> 
  )
}
export default FindTeacher
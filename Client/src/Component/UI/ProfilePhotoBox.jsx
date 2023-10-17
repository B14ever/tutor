import React,{useState,useEffect} from 'react'
import { Avatar,Box,Button,Dialog,DialogActions,DialogTitle,Divider, Typography} from '@mui/material'
import { useAthuContext } from '../Context/AthuContext'
import axios from '../api/api'
const ProfilePhotoBox = () => {
    const {user,dispatch} = useAthuContext()
    const Email = user.user.Email
    const [open, setOpen] = useState(false);
    const [data,setData] = useState({profilePhoto:''})
    const [error,setError] = useState("")
    const handleClickOpen = () => {
        setOpen(true);
      };

    const handleClose = () => {
        setData('')
        setError('')
        setOpen(false);
      }; 
     const handleChange = (e) =>{
     const reader = new FileReader();
     reader.readAsDataURL(e.target.files[0])
     reader.onloadend = () =>{
     setData({profilePhoto: reader.result})
     }
     }
     const changePhoto = async (e)=>{
      e.preventDefault();
    
       try{
        const responce = await axios.post('/AccountProfile/changePhoto',{data,Email})
        localStorage.setItem('USER_DATA',JSON.stringify(responce.data.user))
        dispatch({type:"AUTHENTICATE",payload:{user:responce.data.user,token:localStorage.getItem('TOKEN')}})
        setTimeout(handleClose,500)
      }
         catch(err){
          setError('large image size change')
         }
      }

  return (
     <React.Fragment>
    <Box sx={{position:'relative'}}> 
    <img src="../coverPhoto.png" style={{ width: '100%', height: 'auto',borderTopLeftRadius:'6px',borderTopRightRadius:'6px',objectFit:'contain'}} />
        <Avatar src={user.user.profilePhoto}
         sx={{
              position: 'absolute',
              top: {sm:'calc(100% - 85px)',xs:'calc(100% - 50px)'},
              left: {xs:'calc(32%)',sm:'42%',md:'calc(35%)',lg:'35'}, 
              width: { xs: 100, sm: 150,}, 
              height: { xs: 100, sm: 150,}}}
              onClick={handleClickOpen}/>
    </Box>
    <Dialog open={open} onClose={handleClose} fullWidth >
      <DialogTitle>Add photo</DialogTitle>
      <Divider></Divider>
      <Box component="form" onSubmit={changePhoto} >
        <Box mt={1} mb={1} sx={{display:'flex',gap:'.5rem',flexDirection:'column',alignItems:'center'}}>
            <Avatar  src={ data.profilePhoto || user.user.profilePhoto  }
               sx={{ width:190, height:190, borderRadius: '50%'}} />
             <Typography sx={{color:'red',fontWeight:'300',letterSpacing:'1px'}}>{error?error:""}</Typography>
            <Button sx={{textTransform:'none',
            borderColor:'none',
            backgroundColor:'#16db82',
             color:"#fff",
            ':hover':{
            backgroundColor:'#16db82'
         } }}  type='submit' >save</Button>
        </Box>
        <Divider></Divider>
        <DialogActions sx={{display:'flex',gap:'.5rem'}} >
          <Button sx={{textTransform:'none',
            backgroundColor:'#16db82',
             color:"#fff",
            ':hover':{
            backgroundColor:'#16db82'
         } }} onClick={handleClose}>Cancel</Button>
          <Button sx={{textTransform:'none',
            backgroundColor:'#16db82',
             color:"#fff",
            ':hover':{
            backgroundColor:'#16db82'
         } }} variant='contained' component="label">
            {data.profilePhoto || user.user.profilePhoto ?"change photo": "Upload Photo"}
            <input hidden accept="image/*" multiple type="file" onChange={handleChange}/>
         </Button>
        </DialogActions>
        </Box>
    </Dialog>
     </React.Fragment>
  )
}

export default ProfilePhotoBox

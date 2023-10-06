import React from 'react'
import {Typography} from '@mui/material'
import {useAthuContext} from '../Context/AthuContext'
import { useNavigate } from 'react-router-dom'
const Logout = () => {
    const {dispatch} = useAthuContext()
    const navigate = useNavigate()
    const HandleLogout=()=>{
        localStorage.clear()
        dispatch({type:'LOGOUT'})
        navigate('/')
    }
  return (
    <Typography sx={{width:'100%'}} onClick={HandleLogout} variant="contained">Logout</Typography>
  )
}

export default Logout

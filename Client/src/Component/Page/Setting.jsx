import React, { useState } from 'react'
import {Box,Typography,Tabs,Tab} from '@mui/material'
import Security from '../UI/Security'
import AccountPerference from '../UI/AccountPerference'
const Setting = () => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box  sx={{marginTop:'50px',display:'flex',justifyContent:'center'}}>
    <Box p={2} sx={{boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',width:{xs:'90%',lg:'60%'}}}>
    <Tabs value={value} indicatorColor="secondary" textColor="secondary" variant="fullWidth" onChange={handleChange} centered >
      <Tab label={"General"}/>
      <Tab label={"Security"} />
    </Tabs>
    <Typography component="div" role="tabpanel" hidden={value !== 0}>
      <AccountPerference/>
    </Typography>
    <Typography component="div" role="tabpanel" hidden={value !== 1}>
      <Security/>
    </Typography>
    </Box>
  </Box>
  )
}

export default Setting
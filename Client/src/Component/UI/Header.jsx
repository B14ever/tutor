import * as React from 'react';
import { AppBar,Box,Divider,Drawer,IconButton,List,ListItem,ListItemButton,ListItemText,Button,Typography,Toolbar } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate,useLocation} from 'react-router-dom'
import Logout from './Logout';
const drawerWidth = 240;
const navItems = [
  {
    id:'1',
    name:'Home',
    path:'/'
  },
  {
    id:'2',
    name:'About',
    path:'/about'
  },
  {
    id:'3',
    name:'Log in',
    path:'/login'
  },
];
const colorValue = {
  backColor:'#16db65'
} 
const Bar = styled('Toolbar')(({ theme }) => ({
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    height:'50px',
    padding:'6px 8px'
}));
function Header(props) {
  const navigate = useNavigate()
  const location = useLocation();
  const pathname = location.pathname;
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center',color:'#fff'}}>
      <Typography variant="h6" sx={{ my: 2 }}>
        TUTOR
      </Typography>
      <Divider />
      {
        pathname === '/profile' || pathname === '/setting' ?
     
      <List>
          <ListItem  disablePadding >
            <ListItemButton sx={{ textAlign: 'center'}} onClick={()=>navigate('/setting')}>
              <ListItemText primary={"Setting"} />
            </ListItemButton>
          </ListItem>
          <ListItem  disablePadding >
            <ListItemButton sx={{ textAlign: 'center'}}>
              <Logout/>
            </ListItemButton>
          </ListItem>
      </List>:
      <List>
        {navItems.map((item) => (
          <ListItem key={item.id} disablePadding >
            <ListItemButton sx={{ textAlign: 'center'}} onClick={()=>navigate(`${item.path}`)}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      }
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{backgroundColor:colorValue.backColor,}}>
        <Bar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            TUTOR
          </Typography>
         {
          pathname === '/profile' || pathname === '/setting' ? 
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button  sx={{ color: '#fff' }} onClick={()=>navigate('/setting')}>
              Setting
            </Button>
            <Button  sx={{ color: '#fff' }}>
             <Logout/>
            </Button>
        </Box>:
         <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
         {navItems.map((item) => (
           <Button key={item.id} sx={{ color: '#fff' }} onClick={()=>navigate(`${item.path}`)}>
             {item.name}
           </Button>
         ))}
       </Box>
         }
        </Bar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,backgroundColor:colorValue.backColor},
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main">
        <Toolbar />
      </Box>
    </Box>
  );
}



export default Header;
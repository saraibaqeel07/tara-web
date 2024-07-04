import React, { useContext, useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { Box, AppBar, Divider, Drawer, IconButton, Menu, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Button, CardMedia, MenuItem, Badge } from '@mui/material';
import navigation from '../../../../Navigation';
import { useNavigate, useLocation } from 'react-router-dom';

import Images from '../../../assets/images';
import Colors from '../../../styles/colors';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../../../config/firebase.config';
import { AuthContext } from '../../../Context/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar } from 'antd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from '../../../Context/CartContext';
import { CartCounter } from '../../../Context/CartCounter';

function Header(props) {
  const location = useLocation();
  const { cart, toggleCartVisibility } = useContext(CartContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(location.pathname)
  const { count } = useContext(CartCounter);
 
  const navigate = useNavigate();
  let loginUser = localStorage.getItem('user')
  loginUser = JSON.parse(loginUser)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { user, setUser } = useContext(AuthContext);
  console.log(user, 'useruseruser');
  const handleLogout = () => {

    signOut(auth).then(() => {
      console.log('logout');
      localStorage.clear()
      setUser('')
    }).catch((error) => {
      // An error happened.
    });

  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const handleGoogleLogin = async () => {

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info: ", user);
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      // Handle user info here (e.g., save to state, context, or redirect)
    } catch (error) {
      console.error("Error during Google login: ", error);
    }
  };
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);
useEffect(() => {
 console.log(count,'count');
}, [count])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          boxShadow: "none",
          background: Colors.primaryGradient
        }}
      >
        <Toolbar>
          <Box
            component={"div"}
            sx={{ flexGrow: 1 }}
          >
            <CardMedia
              component={"img"}
              src={Images.logo}
              sx={{
                width: "180px",
                height: "35px",
                objectFit: "contain"
              }}
            />
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }}>
            {navigation.map((item, i) => (
              <Button
                key={i}
                sx={{
                  color: '#fff',
                  backgroundColor: currentPath == item.path ? `${Colors.primary} !important` : "transparent",
                  px: 4
                }}
                onClick={() => {
                  navigate(item.path);
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
          {location.pathname === '/' && <Badge badgeContent={count} color="primary"> <ShoppingCartIcon onClick={toggleCartVisibility} sx={{cursor:"pointer"}} /></Badge>} &nbsp;&nbsp;
          {!user && !loginUser ?
           <>
     
           <Button onClick={handleGoogleLogin} sx={{ color: 'white', border: '1px solid white', display: { lg: 'block', md: "none", sm: "none", xs: "none" } }}>Login</Button></>  : <Box sx={{ display: { lg: 'block', md: "block", sm: "block", xs: "block" } }}>
             
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{color:'white', display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }}
              >
                <Avatar alt="Remy Sharp"  sx={{ width: 56, height: 56 }}
   src={loginUser.photoURL} />
                {loginUser?.displayName}
              </Button>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{color:'white', display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' } }}
              >
                <Avatar alt="Remy Sharp" sx={{ width: 56, height: 56 }} src={loginUser.photoURL} />
               
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}

              >
                {/* <MenuItem sx={{ color: 'black' }} onClick={handleClose}>Profile</MenuItem> */}
                <MenuItem sx={{ color: 'black' }} onClick={() => navigate('/myorders')}>My Orders</MenuItem>
                <MenuItem sx={{ color: 'black' }} onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Box>}

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              display: { lg: 'none', md: "block", sm: "block", xs: "block" }
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', background: Colors.primaryGradient },
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Box
              component={"div"}
              sx={{ p: 2 }}
            >
              <CardMedia
                component={"img"}
                src={Images.logo}
                sx={{
                  width: "180px",
                  height: "35px",
                  objectFit: "contain"
                }}
              />
            </Box>
            <Divider />
            {!user && !loginUser ? <Button onClick={handleGoogleLogin} sx={{ color: 'white', border: '1px solid white', display: { lg: 'block', md: "none", sm: "none", xs: "none" } }}>Login</Button> :
              <Box mb={1} mt={1}> <Box >{loginUser.displayName}</Box>
                
              </Box>
            }
            {!user && !loginUser ?
              <Button onClick={handleGoogleLogin} sx={{ color: 'white', border: '1px solid white', display: { lg: 'block', md: "none", sm: "none", xs: "none" } }}>Login</Button> :
              <Box sx={{ display: { lg: 'block', md: "none", sm: "none", xs: "none" } }}>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{ color: 'white' }}
                >
                  {loginUser?.displayName}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}

                >
                  {/* <MenuItem sx={{ color: 'black' }} onClick={handleClose}>Profile</MenuItem> */}
                  <MenuItem sx={{ color: 'black' }} onClick={() => navigate('/myorders')}>My Orders</MenuItem>
                  <MenuItem sx={{ color: 'black' }} onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>}
            <List>
              {navigation.map((item, i) => (
                <ListItem key={i} disablePadding>
                  <ListItemButton
                    sx={{
                      textAlign: 'center'
                    }}
                    onClick={() => navigate(item.path)}
                  >
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </nav>
      {/* <Toolbar /> */}
    </Box>
  );
}

export default Header

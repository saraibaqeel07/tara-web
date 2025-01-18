import React, { useContext, useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { Box, AppBar, Divider, Drawer, IconButton, Menu, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Button, CardMedia, MenuItem, Badge } from '@mui/material';
import navigation, { navigationNested } from '../../../../Navigation';
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
import { addDoc, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
import moment from 'moment';

function Header(props) {

  const firebaseConfig = {
    apiKey: "AIzaSyCn_Ph5AlAi_wuxR0D7CBIY8_vBCNgD5r8",
    authDomain: "shinetara-86ec0.firebaseapp.com",
    projectId: "shinetara-86ec0",
    storageBucket: "shinetara-86ec0.appspot.com",
    messagingSenderId: "182521981077",
    appId: "1:182521981077:web:3cadc9d70d7fc25fab939c",
    measurementId: "G-BHYZDHJCK9"
  };
  let User = localStorage.getItem('user')


  User = JSON.parse(User)
  const app = initializeApp(firebaseConfig);
  
  const db = getFirestore(app);
  const location = useLocation();
  const { cart, toggleCartVisibility } = useContext(CartContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(location.pathname)
  const { count,setCount } = useContext(CartCounter);
  const [cartItems, setCartItems] = useState([])
  const navigate = useNavigate();
  let loginUser = localStorage.getItem('user')
  loginUser = JSON.parse(loginUser)
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [anchorEl1, setAnchorEl1] = React.useState(null);
  const open1 = Boolean(anchorEl1);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const { user, setUser } = useContext(AuthContext);
  console.log(user, 'useruseruser');
  const handleLogout = () => {

    signOut(auth).then(() => {
      console.log('logout');
      localStorage.clear()
      setUser('')
      handleClose()
    }).catch((error) => {
      // An error happened.
    });

  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleRouteClick = (path) => {
    navigate(path);
    handleDrawerToggle(); 
  };

  const handleGoogleLogin = async () => {

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("User Info: ", user);
      if (user) {
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "users"), {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          lastLogin: moment().format('DD/MM/YYYY')
        });
        console.log("Document written with ID: ", docRef.id);
      }
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      // Handle user info here (e.g., save to state, context, or redirect)
    } catch (error) {
      console.error("Error during Google login: ", error);
    }
  };
  const getCartData = async () => {
    try {

      const userId = User.uid;


      const q = query(collection(db, "cartData"), where("userId", "==", userId));

      const querySnapshot = await getDocs(q);
      const dataArray = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(dataArray[0]?.data, 'dataArray');




      setCartItems(dataArray[0]?.data);
      setCount(dataArray[0]?.data?.length)
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };
  

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);
  useEffect(() => {
   
    getCartData()
  }, [location.pathname])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          boxShadow: "none",
          background: '#5B73AD'
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box
            component={"div"}
            sx={{ width: '20%' }}
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
          <Box sx={{
            display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex' },
            width: '60%',
            alignItems: { xl: 'center' },
            justifyContent: { xl: 'center' },

          }}>
            {navigationNested.map((item, i) => (
              <>
                {!item?.children ? <Button
                  key={i}
                  className='para-text'
                  sx={{
                    color: '#fff',
                    backgroundColor: currentPath == item.path ? `#FF9D04 !important` : "transparent",
                    px: 3,
                    textTransform: 'capitalize'

                  }}
                  onClick={() => {
                    navigate(item.path);
                  }}
                >
                  {item.name}
                </Button> : <> <Button
                  className='para-text'
                  id="basic-button"
                  aria-controls={open1 ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open1 ? 'true' : undefined}
                  onClick={handleClick1}
                  sx={{ color: 'white', display: { xs: 'block', sm: 'block', md: 'block', lg: 'block' }, textTransform: 'capitalize' }}
                >{item?.name}


                </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl1}
                    open={open1}
                    onClose={handleClose1}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}

                  >
                    {/* <MenuItem sx={{ color: 'black' }} onClick={handleClose}>Profile</MenuItem> */}

                    {item?.children?.map((item, index) => (
                      <MenuItem
                        key={index}
                        sx={{ color: 'black' }}
                        onClick={() => {
                          if (item.path) {
                            navigate(item.path);
                          }
                        }}
                      >
                        {item.name}
                      </MenuItem>
                    ))}
                  </Menu> </>}
              </>
            ))}
          </Box>
          <Box sx={{ width: '20%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          
            {true && <Badge
              badgeContent={count > 0 ? count : '0'}
              color="primary"
              overlap="circular"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <Box
                component="img"
                src={Images.cartIcon}
                width="30px"
                onClick={() => navigate('/cart')}
                sx={{ cursor: 'pointer' }}
              />
            </Badge>} &nbsp;&nbsp;
            {!user && !loginUser ?
              <>

                &nbsp; <Button onClick={handleGoogleLogin} sx={{ color: 'white', border: '1px solid #FF9D04', display: { lg: 'block', md: "none", sm: "none", xs: "none" } }}>Login</Button>&nbsp;&nbsp;&nbsp;</> : <Box sx={{ display: { lg: 'block', md: "block", sm: "block", xs: "block" } }}>

                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{ color: 'white', display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }}
                >
                  <Avatar alt="Remy Sharp" sx={{ width: 56, height: 56 }}
                    src={loginUser.photoURL} /> &nbsp;&nbsp;
                  {loginUser?.displayName}
                </Button>
                <Button
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                  sx={{ color: 'white', display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' } }}
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
                display: { xl: 'none', lg: 'block', md: "block", sm: "block", xs: "block" },
                                
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
      <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, 
      }}
      transitionDuration={{ enter: 500, exit: 500 }} 
      sx={{
        display: { xs: 'block', sm: 'block', md: 'block', lg: 'block', xl: "none" },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', background: Colors.primaryGradient },
        transition: 'transform 0.3s ease-in-out', 

      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        <Box
          component={"div"}
          sx={{ p: 2, width: '300px', }}
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
        {!user && !loginUser ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button onClick={handleGoogleLogin} sx={{ color: 'white', border: '1px solid white', display: { lg: 'block', md: "none", sm: "none", xs: "none" } }}>Login</Button>
          </Box>
        ) : (
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
              <MenuItem sx={{ color: 'black' }} onClick={() => { handleClose(); handleRouteClick('/myorders'); }}>My Orders</MenuItem>
              <MenuItem sx={{ color: 'black' }} onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        )}
        <List>
          {navigation.map((item, i) => (
            <ListItem key={i} disablePadding>
              <ListItemButton
                sx={{
                  textAlign: 'center'
                }}
                onClick={() => handleRouteClick(item.path)}
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

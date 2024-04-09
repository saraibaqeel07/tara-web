import React, { useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import { Box, AppBar, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Button, CardMedia } from '@mui/material';
import navigation from '../../../Navigation';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from '@mui/icons-material';
import Images from '../../assets/images';
import Colors from '../../styles/colors';

function Header(props) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(location.pathname)
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

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
          <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
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
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              display: { md: "none", sm: mobileOpen ? "none" : "flex", xs: mobileOpen ? "none" : "flex" }
            }}
          >
            <Menu />
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
            display: { xs: 'block', sm: 'block', md: 'none' },
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

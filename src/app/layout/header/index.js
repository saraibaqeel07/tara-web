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
  console.log("🚀 ~ Header ~ currentPath:", currentPath)
  console.log("🚀 ~ Header ~ location:", location)
  const drawerWidth = 240;
  const { window } = props;
  const navigate = useNavigate();
  const container = window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    setCurrentPath(location.pathname); // Update currentPath when location changes
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
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <Menu />
          </IconButton>
          <Box
            component={"div"}
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
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
          <Box sx={{ display: { xs: 'none', sm: 'flex', gap: '20px' } }}>
            {navigation.map((item, i) => (
              <Button
                key={i}
                sx={{
                  color: '#fff',
                  backgroundColor: currentPath == item.path ? `${Colors.primary} !important` : "transparent",
                  px: 2
                }}
                onClick={() => {
                  navigate(item.path);
                }}
              >
                {item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
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
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
              MUI
            </Typography>
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
      <Toolbar />
    </Box>
  );
}

export default Header

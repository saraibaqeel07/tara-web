import React, { useContext } from 'react';
import Header from "./header/index";
import Footer from "./footer/index";
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { CartContext } from '../../Context/CartContext';

function Layout() {

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%"
      }}
    >
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  )
}

export default Layout
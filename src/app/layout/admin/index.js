import React, { Fragment } from "react";
import { Box } from "@mui/material";
import SideNav from "./sidebar/index";
import Header from "./header/index";
import { Outlet } from "react-router-dom";

export default function AdminLayout({ children }) {
  return (
    <Fragment>
      <Box sx={{ display: "flex" }}>
        <Box>
          <SideNav />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Header />
          <Outlet />
        </Box>
      </Box>
    </Fragment>
  );
};

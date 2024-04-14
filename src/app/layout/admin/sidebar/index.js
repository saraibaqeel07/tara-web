import * as React from "react";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  CardMedia,
  Typography,
} from "@mui/material";
import authNavigation from "../../../../AuthNavigation";
import { useNavigate, useLocation } from "react-router-dom";
import Colors from "../../../styles/colors";
import Images from "../../../assets/images";
// import { Images } from "../assets/images/Images";
const drawerWidth = 240;

export default function SideNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleItemClick = (item) => {
    navigate(item.path);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ gap: "20px", background: Colors.primary }}>
          <Box component={"span"}>
            <CardMedia
              component={"img"}
              src={Images.logo}
              width={"50px"}
              height={"50px"}
              sx={{
                objectFit: "contain",
              }}
            />
          </Box>
        </Toolbar>
        <Divider />
        <List>
          {authNavigation.map((item, index) => (
            <ListItem key={index}>
              <ListItemButton
                onClick={() => {
                  handleItemClick(item);
                }}
                selected={pathname === item.path}
              >
                {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
                <ListItemText sx={{ color: Colors.black }}>{item.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}

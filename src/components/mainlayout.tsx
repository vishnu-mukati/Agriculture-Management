import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Button,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useState } from "react";
import AgricultureIcon from "@mui/icons-material/Agriculture";
const drawerWidthCollapsed = 50;
const drawerWidthExpanded = 180;  
import { Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Logout } from "../store/slices/authSlice";
import EqualizerIcon from '@mui/icons-material/Equalizer';
const navItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { label: "Fields", icon: <ShoppingCartIcon />, path: "/fields" },
  { label : "Statics", icon : <EqualizerIcon/>, path:"/statics"},
];

export const MainLayout = () => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleClick = (path: string) => {
    navigate(path);
  };

  const logOutHandler = () => {
    dispatch(Logout());
    navigate("/login");
  }

  return (
    <Box sx={{ display: "block" }}>
      <Drawer
        variant="permanent"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        sx={{
          width: hovered ? drawerWidthExpanded : drawerWidthCollapsed,
          flexShrink: 0,
          whiteSpace: "nowrap",
          boxSizing: "border-box",
          transition: "width 0.5s ease",
          "& .MuiDrawer-paper": {
            width: hovered ? drawerWidthExpanded : drawerWidthCollapsed,
            overflowX: "hidden",
            transition: "width 0.3s ease",
            boxSizing: "border-box",
            bgcolor: "#f5f5f5",
            borderRight: "1px solid #e0e0e0",
          },
        }}
      >
        <List>
          <ListItem
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: hovered ? "flex-start" : "center",
              py: 2,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: hovered ? 1.5 : "auto",
                justifyContent: "center",
              }}
            >
              <AgricultureIcon />
            </ListItemIcon>
            {hovered && (
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Agriculture
              </Typography>
            )}
          </ListItem>
          {navItems.map((item, index) => (
            <Tooltip
              key={index}
              title={!hovered ? item.label : ""}
              placement="right"
              arrow
            >
              <ListItem
                onClick={() => handleClick(item.path)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: hovered ? "flex-start" : "center",
                  px: 2,
                  py: 1.5,
                  borderRadius: 2,
                  cursor: "pointer",
                  transition: "background 0.2s",
                  "&:hover": {
                    backgroundColor: "#e0e0e0",
                  },
                  my: 0.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: hovered ? 2 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {hovered && (
                  <ListItemText
                    primary={item.label}
                    sx={{
                      opacity: hovered ? 1 : 0,
                      transition: "opacity 0.2s",
                      whiteSpace: "nowrap",
                    }}
                  />
                )}
              </ListItem>
            </Tooltip>
          ))}
        </List>
        <Box
          sx={{
            mb: 2,
            display: "block",
            justifyContent: hovered ? "flex-start" : "center",
            px: 2,
          }}
        >
          <Button
            startIcon={<LogoutIcon />}
            sx={{
              justifyContent: hovered ? "flex-start" : "center",
              width: "100%",
              minWidth: 0,
              px: hovered ? 2 : 0,
            }}
            onClick={logOutHandler}
          >
            {hovered && "LogOut"}
          </Button>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Add your page content here */}
         <Outlet/>
      </Box>
    </Box>
  );
}

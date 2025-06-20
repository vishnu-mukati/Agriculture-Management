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
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import { useState } from "react";
import AgricultureIcon from "@mui/icons-material/Agriculture";
const drawerWidthCollapsed = 50;
const drawerWidthExpanded = 180;
import { Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { Dashboard } from "../pages/dashboard/Dashboard";

const navItems = [
  { label: "Dashboard", icon: <DashboardIcon />, path : "/"},
  { label: "Orders", icon: <ShoppingCartIcon />, path : "/orders" },
  { label: "Reports", icon: <BarChartIcon />, path : "/reports" },
  { label: "Integrations", icon: <LayersIcon />, path : "/integrations" },
];

export default function MainLayout() {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const handleClick = (path: string) => {
   navigate(path);
   console.log(path);
  };

  return (
    <Box sx={{ display: "flex" }}>
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
            display: "flex",
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
          >
            {hovered && "LogOut"}
          </Button>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* <Typography variant="h4" color="black">
          Welcome To Agriculture Management
        </Typography> */}
        {/* Add your page content here */}
       <Dashboard/>
      </Box>
    </Box>
  );
}

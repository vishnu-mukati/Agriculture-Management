import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useState } from "react";
import { Box, Typography } from "@mui/material";

export const FieldDetails = () => {
  const [value, setValue] = useState("recents");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box mt={2}>
        {value === "recents" && (
          <Typography>Recent field data is shown here.</Typography>
        )}
        {value === "favorites" && (
          <Typography>Your favorite fields.</Typography>
        )}
        {value === "nearby" && (
          <Typography>Nearby fields based on location.</Typography>
        )}
        {value === "folder" && (
          <Typography>All field documents stored in folder.</Typography>
        )}
      </Box>

      <BottomNavigation
        sx={{ width: 500 }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Recents"
          value="recents"
          icon={<RestoreIcon />}
          disableRipple
          sx={{
            "&:focus": { outline: "none" },
          }}
        />
        <BottomNavigationAction
          label="Favorites"
          value="favorites"
          icon={<FavoriteIcon />}
          disableRipple
          sx={{
            "&:focus": { outline: "none" },
          }}
        />
        <BottomNavigationAction
          label="Nearby"
          value="nearby"
          icon={<LocationOnIcon />}
          disableRipple
          sx={{
            "&:focus": { outline: "none" },
          }}
        />
        <BottomNavigationAction
          label="Folder"
          value="folder"
          icon={<FolderIcon />}
          disableRipple
          sx={{
            "&:focus": { outline: "none" },
          }}
        />
      </BottomNavigation>
    </Box>
  );
};

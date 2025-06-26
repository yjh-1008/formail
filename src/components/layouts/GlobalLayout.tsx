import { Box, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
export default function GlobalLayout() {
  return (
    <Box component="main">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">My App</Typography>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}

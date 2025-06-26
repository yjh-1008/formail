import AppBar from "@mui/material/AppBar";
import { Toolbar, Typography } from "@mui/material";
export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Formail</Typography>
      </Toolbar>
    </AppBar>
  );
}

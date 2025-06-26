import Header from "../headers/Header";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function GlobalLayout() {
  return (
    <Box component="main">
      <Header />
      <Outlet />
    </Box>
  );
}

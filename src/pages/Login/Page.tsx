import { Box } from "@mui/material";
import LoginCard from "../../components/cards/LoginCard";

export default function Login() {
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <LoginCard />
    </Box>
  );
}

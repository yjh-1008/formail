import { Box, Typography } from "@mui/material";
import Editor from "../components/editors/Editor";
export default function Home() {
  return (
    <Box component="section">
      <Typography variant="h1">Formail</Typography>
      <Editor />
    </Box>
  );
}

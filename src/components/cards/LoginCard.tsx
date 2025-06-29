import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function LoginCard() {
  return (
    <Card
      sx={{
        width: "450px",
        maxWidth: "100%",
        padding: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h4" fontWeight={700}>
        로그인
      </Typography>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">이메일</FormLabel>
          <TextField id="email" name="email" type="email" autoFocus />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">비밀번호</FormLabel>
          <TextField id="password" name="password" type="password" />
        </FormControl>
        <Button type="submit" fullWidth variant="contained">
          Sign in
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          아직 회원이 아니신가요? <Link href="/signup">회원가입</Link>
        </Typography>
      </Box>
    </Card>
  );
}

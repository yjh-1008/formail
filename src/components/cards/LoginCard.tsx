import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useValidationInput } from "../../hooks/useValidationInput";

export default function LoginCard() {
  const {
    text: email,
    handleInput: setEmail,
    error: emailError,
    setError: setEmailError,
    helperText: emailHelperText,
    setHelperText: setEmailHelperText,
  } = useValidationInput();
  const {
    text: password,
    handleInput: setPassword,
    error: passwordError,
    setError: setPasswordError,
    helperText: passwordHelperText,
    setHelperText: setPasswordHelperText,
  } = useValidationInput();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("here2");
    if (!emailError && !passwordError) {
      console.log(email, password);
      alert("로그인 성공");
    } else {
      alert("로그인 실패");
    }
  };

  const onValidationSubmit = () => {
    let isValid = true;
    console.log("here");
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailHelperText("올바른 이메일 형식을 입력해주세요.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailHelperText("");
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordHelperText("비밀번호는 6자 이상이어야 합니다.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordHelperText("");
    }

    return isValid;
  };

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
        noValidate
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", width: "100%", gap: 2 }}
      >
        <FormControl>
          <FormLabel htmlFor="email">이메일</FormLabel>
          <TextField
            id="email"
            name="email"
            type="email"
            autoFocus
            error={emailError}
            helperText={emailHelperText}
            value={email}
            onInput={setEmail}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">비밀번호</FormLabel>
          <TextField
            id="password"
            name="password"
            type="password"
            error={passwordError}
            helperText={passwordHelperText}
            value={password}
            onInput={setPassword}
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={onValidationSubmit}
        >
          로그인
        </Button>
        <Typography sx={{ textAlign: "center" }}>
          아직 회원이 아니신가요? <Link href="/signup">회원가입</Link>
        </Typography>
      </Box>
    </Card>
  );
}

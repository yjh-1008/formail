import { fireEvent, render, screen } from "@testing-library/react";
import Login from "../../pages/Login/Page";

describe("LoginPage", () => {
  it("renders a login card", () => {
    render(<Login />);
    expect(screen.getByRole("heading", { name: "로그인" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "로그인" })).toBeInTheDocument();
  });

  it("로그인을 진행하기 전 검사를 통과해야한다", async () => {
    //given
    render(<Login />);
    const emailInput = screen.getByTestId("email").querySelector("input");
    const passwordInput = screen.getByTestId("password").querySelector("input");
    const loginButton = screen.getByTestId("login-button");

    //when
    fireEvent.change(emailInput!, { target: { value: "ta" } });
    fireEvent.change(passwordInput!, { target: { value: "test1234" } });
    fireEvent.click(loginButton!);

    //then
    expect(
      await screen.findByText("올바른 이메일 형식을 입력해주세요.")
    ).toBeInTheDocument();
  });
});

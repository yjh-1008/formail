import { render, screen } from "@testing-library/react";
import Login from "../../pages/Login/Page";

describe("LoginPage", () => {
  it("renders a login card", () => {
    render(<Login />);
    expect(screen.getByRole("heading", { name: "로그인" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "로그인" })).toBeInTheDocument();
  });
});

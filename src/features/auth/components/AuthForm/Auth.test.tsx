import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AuthForm from "./AuthForm";
import * as authStore from "../../store/useAuthStore";

jest.mock("../../store/useAuthStore");

describe("AuthForm", () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    (authStore.useAuthStore as unknown as jest.Mock).mockImplementation(
      (selector) =>
        selector({
          login: mockLogin,
          logout: jest.fn(),
          user: null,
        })
    );
  });

  it("renders email and password inputs and submit button", () => {
    render(<AuthForm />);
    expect(
      screen.getByPlaceholderText("example@example.com")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("******")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Увійти/i })).toBeInTheDocument();
  });

  it("shows validation errors on blur", async () => {
    render(<AuthForm />);
    const emailInput = screen.getByPlaceholderText("example@example.com");
    const passwordInput = screen.getByPlaceholderText("******");

    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    expect(await screen.findByText(/Емейл обов'язковий/i)).toBeInTheDocument();
    expect(await screen.findByText(/Пароль обов'язковий/i)).toBeInTheDocument();
  });

  it("prevents submission if validation fails", async () => {
    render(<AuthForm />);
    const submitButton = screen.getByRole("button", { name: /Увійти/i });

    fireEvent.click(submitButton);

    expect(await screen.findByText(/Емейл обов'язковий/i)).toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("calls login on valid submission and resets form", async () => {
    render(<AuthForm />);
    const emailInput = screen.getByPlaceholderText("example@example.com");
    const passwordInput = screen.getByPlaceholderText("******");
    const submitButton = screen.getByRole("button", { name: /Увійти/i });

    await userEvent.type(emailInput, "test.user@test.com");
    await userEvent.type(passwordInput, "Aa123456!");

    fireEvent.click(submitButton);

    expect(mockLogin).toHaveBeenCalledWith("test.user@test.com", "Aa123456!");
    expect(
      await screen.findByText(/ваша авторизація успішна/i)
    ).toBeInTheDocument();
  });

  it("shows link to registration page", () => {
    render(<AuthForm />);
    const link = screen.getByRole("link", { name: /зареєструватися/i });
    expect(link).toHaveAttribute("href", "/register");
  });
});

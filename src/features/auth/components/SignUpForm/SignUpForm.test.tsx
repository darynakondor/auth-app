import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignUpForm from "./SignUpForm";
import * as authStore from "../../store/useAuthStore";

jest.mock("../../store/useAuthStore");

describe("SignUpForm", () => {
  const mockSignup = jest.fn();

  beforeEach(() => {
    (authStore.useAuthStore as unknown as jest.Mock).mockImplementation(
      (selector) =>
        selector({
          login: mockSignup,
          logout: jest.fn(),
          user: null,
        })
    );
  });

  it("renders email and password inputs and submit button", () => {
    render(<SignUpForm />);
    expect(
      screen.getByPlaceholderText("example@example.com")
    ).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText("••••••")[0]).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Зареєструватися/i })
    ).toBeInTheDocument();
  });

  it("shows validation errors on blur", async () => {
    render(<SignUpForm />);
    const emailInput = screen.getByPlaceholderText("example@example.com");
    const passwordInput = screen.getAllByPlaceholderText("••••••")[0];

    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    expect(await screen.findByText(/Email обов'язковий/i)).toBeInTheDocument();
    expect(await screen.findByText(/Пароль обов'язковий/i)).toBeInTheDocument();
  });

  it("prevents submission if validation fails", async () => {
    render(<SignUpForm />);
    const submitButton = screen.getByRole("button", {
      name: /Зареєструватися/i,
    });

    fireEvent.click(submitButton);

    expect(await screen.findByText(/Email обов'язковий/i)).toBeInTheDocument();
    expect(mockSignup).not.toHaveBeenCalled();
  });

  it("calls login on valid submission and resets form", async () => {
    render(<SignUpForm />);
    const emailInput = screen.getByPlaceholderText("example@example.com");
    const passwordInput = screen.getAllByPlaceholderText("••••••")[0];
    const repeatPasswordInput = screen.getAllByPlaceholderText("••••••")[1];
    const submitButton = screen.getByRole("button", {
      name: /Зареєструватися/i,
    });

    await userEvent.type(emailInput, "test.user@test.com");
    await userEvent.type(passwordInput, "Aa123456!");
    await userEvent.type(repeatPasswordInput, "Aa123456!");

    fireEvent.click(submitButton);

    expect(mockSignup).toHaveBeenCalledWith("test.user@test.com", "Aa123456!");
    expect(
      await screen.findByText(/Ваша реєстрація успішна/i)
    ).toBeInTheDocument();
  });

  it("shows link to login page", () => {
    render(<SignUpForm />);
    const link = screen.getByRole("link", { name: /Увійти/i });
    expect(link).toHaveAttribute("href", "/login");
  });
  it("renders repeat password input", () => {
    render(<SignUpForm />);
    expect(screen.getByLabelText(/Повтор паролю/i)).toBeInTheDocument();
  });

  it("shows validation errors for repeat password on blur", async () => {
    render(<SignUpForm />);
    const repeatPasswordInput = screen.getByLabelText(/Повтор паролю/i);

    fireEvent.blur(repeatPasswordInput);

    expect(
      await screen.findByText(/Паролі не співпадають/i)
    ).toBeInTheDocument();
  });

  it("prevents submission if repeat password validation fails", async () => {
    render(<SignUpForm />);
    const emailInput = screen.getByPlaceholderText("example@example.com");
    const passwordInput = screen.getAllByPlaceholderText("••••••")[0];
    const repeatPasswordInput = screen.getByLabelText(/Повтор паролю/i);
    const submitButton = screen.getByRole("button", {
      name: /Зареєструватися/i,
    });

    await userEvent.type(emailInput, "test.user@test.com");
    await userEvent.type(passwordInput, "Aa123456!");
    await userEvent.type(repeatPasswordInput, "Aa12345");

    fireEvent.click(submitButton);

    expect(
      await screen.findByText(/Паролі не співпадають/i)
    ).toBeInTheDocument();
  });

  it("calls signup on valid submission with repeat password", async () => {
    render(<SignUpForm />);
    const emailInput = screen.getByPlaceholderText("example@example.com");
    const passwordInput = screen.getAllByPlaceholderText("••••••")[0];
    const repeatPasswordInput = screen.getByLabelText(/Повтор паролю/i);
    const submitButton = screen.getByRole("button", {
      name: /Зареєструватися/i,
    });

    await userEvent.type(emailInput, "test.user@test.com");
    await userEvent.type(passwordInput, "Aa123456!");
    await userEvent.type(repeatPasswordInput, "Aa123456!");

    fireEvent.click(submitButton);
    expect(
      await screen.findByText(/Ваша реєстрація успішна/i)
    ).toBeInTheDocument();
  });
});

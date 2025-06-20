export function validateEmail(email: string): string[] {
  if (!email.trim()) return ["Email обов'язковий"];
  if (!email.includes("@")) return ["Email введено невірно"];
  if (email.length > 320) return ["Email введено невірно"];
  const errors: string[] = [];

  function isEmailValid(email: string): boolean {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/i.test(email);
  }

  if (!isEmailValid(email.trim())) {
    errors.push("Email введено невірно");
  }
  return errors;
}
export function validateRepeatedPassword(
  password: string,
  repeatPassword: string
): string[] {
  if (!repeatPassword || password != repeatPassword)
    return ["Паролі не співпадають"];
  return [];
}
export function validatePassword(password: string): string[] {
  if (!password.trim()) return ["Пароль обов'язковий"];

  const errors: string[] = [];
  password = password.trim();

  function containsLowerCaseLetter(password: string): boolean {
    return /[a-z]/.test(password);
  }
  function containsUpperCaseLetter(password: string): boolean {
    return /[A-Z]/.test(password);
  }
  function containsDigit(password: string): boolean {
    return /\d/.test(password);
  }
  function containsSpecialCharacter(password: string): boolean {
    return /[@$!%*?&]/.test(password);
  }

  if (password.length < 6)
    errors.push("Мінімальна довжина паролю - 6 символів");
  if (password.length > 255)
    errors.push("Максимальна довжина паролю - 255 символів");
  if (!containsLowerCaseLetter(password))
    errors.push("Пароль повинен мати хочаб одну малу літеру");
  if (!containsUpperCaseLetter(password))
    errors.push("Пароль повинен містити хоча б одну велику літеру");
  if (!containsDigit(password))
    errors.push("Пароль повинен містити щонайменше одну цифру");
  if (!containsSpecialCharacter(password))
    errors.push("Пароль повинен містити хоча б один спеціальний символ");

  return errors;
}

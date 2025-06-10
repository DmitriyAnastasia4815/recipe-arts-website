export const validEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

export const validPassword = (password: string): boolean => {
  if (password.length >= 8) {
    const hasDigit = /\d/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    return hasDigit && hasLowercase;
  }
  return false;
};

export const validUsername = (username: string): boolean => {
  const usernameRegex = /^(?![-])[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$(?<!-)/;
  return usernameRegex.test(username);
};

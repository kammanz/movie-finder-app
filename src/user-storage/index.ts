const USER_LOCALSTORAGE_KEY = 'user';

export function getStoredUser(): string | null {
  const storedUser = localStorage.getItem(USER_LOCALSTORAGE_KEY);
  return storedUser ? storedUser : null;
}

export function setStoredUser(userEmail: string) {
  localStorage.setItem(USER_LOCALSTORAGE_KEY, userEmail);
}

export function clearStoredUser() {
  localStorage.removeItem(USER_LOCALSTORAGE_KEY);
}

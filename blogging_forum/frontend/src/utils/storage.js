const CURRENT_USER_KEY = "blog_user";
const TOKEN_KEY = "blog_token";

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY));
  } catch {
    return null;
  }
}

export function saveSession(user, token) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, token);
}

export function signOutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
}
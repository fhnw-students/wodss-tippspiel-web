const AUTH_TOKEN_KEY = "w3-token";

export function isAuthenticated(): boolean {
  return !!getToken();
}

export function getToken(): string | null {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function removeToken(): void {
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

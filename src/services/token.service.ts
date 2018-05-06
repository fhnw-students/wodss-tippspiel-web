export const TOKEN_KEY = 'wodss-access-token';

export const setToken = (token: string): void => localStorage.setItem(TOKEN_KEY, token);

export const getToken = (): string | null => localStorage.getItem(TOKEN_KEY);

export const removeToken = (): void => localStorage.removeItem(TOKEN_KEY);

import Vue from 'vue';

import { setToken, removeToken } from '@/services/token.service';

/**
 * Logins a user with his credentials to get a valid access token
 */
export async function signIn(username: string, password: string): Promise<string> {
  const token = btoa(`${username}:${password}`);
  const response = await Vue.$http.post('/auth/login', undefined, {
    headers: {
      Authorization: `Basic ${token}`,
    },
  });
  return response.data.token;
}

/**
 * Signs the user off the server and removes the access token from the localstorage.
 */
export async function signOut(): Promise<void> {
  await Vue.$http.post('/auth/logout');
}

/**
 * Register a new user at the backend
 */
export async function registerUser(username: string, email: string, password: string): Promise<void> {
  await Vue.$http.post('/auth/register', {
    username,
    email,
    password,
  });
}

/**
 * Verifies the user throw is given email in the registration
 */
export async function verifyUser(verifyToken: string): Promise<void> {
  await Vue.$http.put(`/auth/verify/${verifyToken}`);
}

/**
 * Request to change the password. This will send a email to the user with
 * a reset password link.
 */
export async function forgotPassword(email: string): Promise<void> {
  await Vue.$http.put('/auth/reset', { email });
}

/**
 * Resets the password of the given user with the reset token from the received email.
 */
export async function resetUserPassword(resetToken: string, password: string): Promise<void> {
  await Vue.$http.put(`/auth/reset/${resetToken}`, { password });
}

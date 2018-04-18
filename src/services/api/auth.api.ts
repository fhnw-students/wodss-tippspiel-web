import Vue from 'vue';

import { setToken, removeToken } from '@/services/token.service';

/**
 * Logins a user with his credentials to get a valid access token
 */
export async function signIn(username: string, password: string): Promise<void> {
  const token = btoa(`${username}:${password}`);
  const response = await Vue.$fetchClient()
    .withoutCredentials()
    .withHeaders({
      Authorization: `Basic ${token}`,
    })
    .fetchPost('/auth/login');

  if (response.status === 200) {
    const body = await response.json();
    return setToken(body.token);
  }

  throw new Error('Could not login');
}

/**
 * Signs the user off the server and removes the access token from the localstorage.
 */
export async function signOut(): Promise<void> {
  await Vue.$fetchClient().fetchPost('/auth/logout');
  return removeToken();
}

/**
 * Register a new user at the backend
 */
export async function registerUser(username: string, email: string, password: string): Promise<void> {
  const response = await Vue.$fetchClient()
    .withoutCredentials()
    .fetchPost('/auth/register', {
      username,
      email,
      password,
    });

  if (response.status !== 200) {
    throw new Error('Could not register the user');
  }

}

/**
 * Verifies the user throw is given email in the registration
 */
export async function verifyUser(verifyToken: string): Promise<void> {
  const response = await Vue.$fetchClient()
    .fetchPut(`/auth/verify/${verifyToken}`);

  if (response.status !== 200) {
    throw new Error('Could not register the user');
  }

}

/**
 * Request to change the password. This will send a email to the user with
 * a reset password link.
 */
export async function forgotPassword(email: string): Promise<void> {
  const response = await Vue.$fetchClient()
    .fetchPut(`/auth/reset`, {
      email,
    });

  if (response.status !== 200) {
    throw new Error('Could not register the user');
  }

}

/**
 * Resets the password of the given user with the reset token from the received email.
 */
export async function resetUserPassword(resetToken: string, password: string): Promise<void> {
  const response = await Vue.$fetchClient()
    .fetchPut(`/auth/reset/${resetToken}`, { password });

  if (response.status !== 200) {
    throw new Error('Could not register the user');
  }

}

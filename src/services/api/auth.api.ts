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
  await Vue.$fetchClient().fetchGet('/auth/logout');
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

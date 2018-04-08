
export interface Credentials {
  username: string;
  password: string;
}

/**
 * @name fetchToken
 * @description Fetches the token with the given user credentials and verifies if he
 * is authorized to access the app or not.
 * @param credentials Login user credentials.
 * @return Token from the fetch request.
 */
export async function fetchToken(credentials: Credentials): Promise<string> {
  /**
   * Here must be the request for the token to verify if the user is allowed or not.
   */
  return "demo-token";
}

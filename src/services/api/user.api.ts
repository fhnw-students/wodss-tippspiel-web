import Vue from 'vue';
import { User } from '@/models/User';
import { plainToClass } from 'class-transformer';

/**
 * Loads the current user from backend
 */
export async function getCurrentUser(): Promise<User> {
  const response = await Vue.$http.get(`/users/me`);
  return plainToClass<User, User>(User, response.data);
}

// update user put ohne vuex (in verify komponente)

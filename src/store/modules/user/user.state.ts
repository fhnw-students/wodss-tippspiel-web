import { plainToClass } from 'class-transformer';

import { User } from '@/models/User';
import * as pkg from '../../../../package.json';

export interface UserState {
  currentUser: User;
  isFetching: boolean;
  hasFailed: boolean;
}

export const initialState: UserState = {
  currentUser: new User(),
  hasFailed: false,
  isFetching: false,
};

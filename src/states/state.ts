import { AuthState } from './modules/auth';
import { MetaDataState } from './modules/meta';

export interface State {
  auth: AuthState;
  meta: MetaDataState;
}

import { plainToClass } from 'class-transformer';

import { ApiInfo } from '@/models/ApiInfo';
import { GuiInfo } from '@/models/GuiInfo';
import * as pkg from '../../../../package.json';

export interface MetaDataState {
  api: ApiInfo;
  gui: GuiInfo;
  hasFailed: boolean;
  isFetching: boolean;
  isServerAvailable: boolean;
}

export const initialState: MetaDataState = {
  api: new ApiInfo(),
  gui: plainToClass<GuiInfo, GuiInfo>(GuiInfo, (pkg as any)),
  hasFailed: false,
  isFetching: false,
  isServerAvailable: true,
};

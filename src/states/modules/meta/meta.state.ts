import { plainToClass } from 'class-transformer';

import { MetaData } from '@/models/MetaData';
import * as pkg from '../../../../package.json';

export interface MetaDataState {
  api: MetaData;
  gui: MetaData;
  hasFailed: boolean;
  isFetching: boolean;
}

export const initialState: MetaDataState = {
  api: new MetaData(),
  gui: plainToClass<MetaData, MetaData>(MetaData, (pkg as any)),
  hasFailed: false,
  isFetching: false,
};

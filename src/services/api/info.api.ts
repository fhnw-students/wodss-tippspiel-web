import { plainToClass } from 'class-transformer';

import { api } from '@/config/api.config';
import { MetaData } from '@/models/MetaData';

/**
 * @name getAPIInfo
 * @description Loads the information of the api.
 * @returns List of contributors.
 */
export async function getAPIInfo(): Promise<MetaData> {
  return await api()
    .withoutCredentials()
    .withModel(MetaData)
    .fetchGet<MetaData>();
}

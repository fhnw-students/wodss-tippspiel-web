import Vue from 'vue';

import { plainToClass } from 'class-transformer';

import { MetaData } from '@/models/MetaData';

/**
 * @name getAPIInfo
 * @description Loads the information of the api.
 * @returns List of contributors.
 */
export async function getAPIInfo(): Promise<MetaData> {
  return await Vue.$fetchClient()
    .withoutCredentials()
    .withModel(MetaData)
    .fetchGet<MetaData>();
}

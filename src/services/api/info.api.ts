import Vue from 'vue';

import { plainToClass } from 'class-transformer';

import { MetaData } from '@/models/MetaData';

/**
 * @name getAPIInfo
 * @description Loads the information of the api.
 * @returns List of contributors.
 */
export async function getAPIInfo(): Promise<MetaData> {
  const response = await Vue.$fetchClient()
    .withoutCredentials()
    .fetchGet();

  if (response.status === 200) {
    const body = await response.json();
    return plainToClass<MetaData, any>(MetaData, body) as any;
  }

  throw new Error('Could not load api info');
}

import Vue from 'vue';

import { plainToClass } from 'class-transformer';

import { ApiInfo } from '@/models/ApiInfo';

/**
 * @name getAPIInfo
 * @description Loads the information of the api.
 * @returns List of contributors.
 */
export async function getApiInfo(): Promise<ApiInfo> {
  const response = await Vue.$fetchClient()
    .withoutCredentials()
    .fetchGet('/api');

  if (response.status === 200) {
    const body = await response.json();
    return plainToClass<ApiInfo, any>(ApiInfo, body) as any;
  }

  throw new Error('Could not load api info');
}

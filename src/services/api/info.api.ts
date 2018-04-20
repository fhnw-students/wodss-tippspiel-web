import Vue from 'vue';

import { plainToClass } from 'class-transformer';

import { ApiInfo } from '@/models/ApiInfo';

/**
 * @name getAPIInfo
 * @description Loads the information of the api.
 * @returns List of contributors.
 */
export async function getApiInfo(): Promise<ApiInfo> {
  const response = await Vue.$http.get('/api');
  return plainToClass<ApiInfo, ApiInfo>(ApiInfo, response.data);
}

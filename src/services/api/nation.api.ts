import Vue from 'vue';

import { classToPlain, plainToClass } from 'class-transformer';

import { Nation } from '@/models/Nation';

export async function getAllNations(): Promise<Nation[]> {
  const response = await Vue.$http.get(`/nations`);
  return plainToClass<Nation, Nation[]>(Nation, response.data);
}

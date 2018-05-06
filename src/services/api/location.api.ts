import Vue from 'vue';

import { classToPlain, plainToClass } from 'class-transformer';

import { Location } from '@/models/Location';

export async function getAllLocations(): Promise<Location[]> {
  const response = await Vue.$http.get(`/locations`);
  return plainToClass<Location, Location[]>(Location, response.data);
}

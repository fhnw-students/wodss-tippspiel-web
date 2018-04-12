import { appConfig } from './app.config';
import { createRestClient } from '../lib/rest-client';

export const api = createRestClient({
  basePath: appConfig.apiPath,
});

export * from '../lib/rest-client';

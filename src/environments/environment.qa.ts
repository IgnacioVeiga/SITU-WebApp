import { AppEnvironment } from './environment.model';

export const environment: AppEnvironment = {
  name: 'qa',
  production: false,
  apiBaseUrl: 'https://qa-api.situ.local/api/v1',
  useMockApi: false
};

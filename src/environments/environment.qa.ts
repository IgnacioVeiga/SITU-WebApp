import { AppEnvironment } from './environment.model';

export const environment: AppEnvironment = {
  name: 'qa',
  production: false,
  API_URL: 'https://qa-api.situ.local',
  API_PREFIX: '/api/v1',
  useMockApi: false
};

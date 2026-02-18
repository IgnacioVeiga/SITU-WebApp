import { AppEnvironment } from './environment.model';

export const environment: AppEnvironment = {
  name: 'mock',
  production: false,
  API_URL: 'http://localhost:8080',
  API_PREFIX: '/api/v1',
  useMockApi: true
};

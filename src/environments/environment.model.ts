export interface AppEnvironment {
  name: 'dev' | 'qa' | 'prod' | 'mock';
  production: boolean;
  API_URL: string;
  API_PREFIX: string;
  useMockApi: boolean;
}

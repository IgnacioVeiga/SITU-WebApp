export interface AppEnvironment {
  name: 'dev' | 'qa' | 'prod' | 'mock';
  production: boolean;
  apiBaseUrl: string;
  useMockApi: boolean;
}

export interface ITestConfig {
  env: string;
  port: number;
  host: string;
  protocol: string;
  adminCredentials: {
    password: string;
    email: string;
  };
}

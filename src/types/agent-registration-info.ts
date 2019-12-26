export interface AgentRegistrationInfo {
  name: string;
  description: string;
  environment: string;
  packagesPrefixes: string[];
  sessionIdHeaderName: string;
  plugins: string[];
}

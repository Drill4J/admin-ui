export interface AgentRegistrationInfo {
  name: string;
  description: string;
  group: string;
  packagesPrefixes: string[];
  sessionIdHeaderName: string;
  plugins: string[];
}

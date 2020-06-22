export interface Plugin {
  id?: string;
  name?: string;
  description?: string;
  type?: string;
  relation?: 'Installed' | 'New';
  version?: string;
}

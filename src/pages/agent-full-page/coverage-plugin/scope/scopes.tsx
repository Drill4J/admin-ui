import * as React from 'react';

import { ScopesList } from './scopes-list';
import { ScopeInfo } from './scope-info';

interface Props {
  agentId: string;
  buildVersion: string;
}

export const Scopes = (props: Props) => {
  const [selectedScope, setSelectedScope] = React.useState('');
  return selectedScope ? (
    <ScopeInfo {...props} selectedScope={selectedScope} />
  ) : (
    <ScopesList {...props} onScopeClick={setSelectedScope} />
  );
};

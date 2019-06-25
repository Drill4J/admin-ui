import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Panel } from '../../../../layouts';
import { Button } from '../../../../forms';
import { Icons } from '../../../../components';
import { useBuildVersion } from '../use-build-version';
import { CreateNewScopeModal } from './create-new-scope-modal';
import styles from './scopes.module.scss';

interface Props {
  className?: string;
  agentId: string;
  buildVersion: string;
}

const scopes = BEM(styles);

export const Scopes = scopes(({ className, agentId, buildVersion }: Props) => {
  const agentBuildVersions = useBuildVersion<string[]>('/scopes', agentId, buildVersion) || [];
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <div className={className}>
      {agentBuildVersions.length === 0 ? (
        <Content>
          <Title>No testing scope started yet</Title>
          <Instructions>
            Some info here about why would you need to start a testing scope or something.
          </Instructions>
          <StartNewScope type="secondary" onClick={() => setIsModalOpen(true)}>
            <Panel align="center">
              <NewScopeIcon /> <span>Start new scope</span>
            </Panel>
          </StartNewScope>
        </Content>
      ) : (
        <div>Scope list</div>
      )}
      {isModalOpen && (
        <CreateNewScopeModal isOpen={isModalOpen} onToggle={setIsModalOpen} agentId={agentId} />
      )}
    </div>
  );
});

const Content = scopes.content('div');
const Title = scopes.title('div');
const Instructions = scopes.instructions('div');
const StartNewScope = scopes.startNewScope(Button);
const NewScopeIcon = scopes.newScopeIcon(Icons.Add);

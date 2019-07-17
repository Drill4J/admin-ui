import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Button } from '../../../../../forms';
import { Icons } from '../../../../../components';
import { Panel } from '../../../../../layouts';
import { CreateNewScopeModal } from '../create-new-scope-modal';

import styles from './no-scope-stub.module.scss';

interface Props {
  className?: string;
  agentId: string;
}

const noScopeStub = BEM(styles);

export const NoScopeStub = noScopeStub(({ className, agentId }: Props) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <div className={className}>
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
      {isModalOpen && (
        <CreateNewScopeModal isOpen={isModalOpen} onToggle={setIsModalOpen} agentId={agentId} />
      )}
    </div>
  );
});

const Content = noScopeStub.content('div');
const Title = noScopeStub.title('div');
const Instructions = noScopeStub.instructions('div');
const StartNewScope = noScopeStub.startNewScope(Button);
const NewScopeIcon = noScopeStub.newScopeIcon(Icons.Add);

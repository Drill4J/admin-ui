import { BEM } from '@redneckz/react-bem-helper';
import { Icons } from '@drill4j/ui-kit';

import { AGENT_STATUS } from 'common/constants';
import { usePluginState } from '../../../store';

import styles from './no-tests-stub.module.scss';

interface Props {
  className?: string;
}

const noTestsStub = BEM(styles);

export const NoTestsStub = noTestsStub(({ className }: Props) => {
  const { agent: { status = '' } = {} } = usePluginState();
  return (
    <div className={className}>
      <Icon height={104} width={107} />
      <Title>
        {status === AGENT_STATUS.BUSY ? 'Build tests are loading' : 'No tests available yet.'}
      </Title>
      <Message>
        {status === AGENT_STATUS.BUSY
          ? 'It may take a few seconds.'
          : 'Information about project tests will appear after the first launch of tests.'}
      </Message>
    </div>
  );
});

const Icon = noTestsStub.icon(Icons.Test);
const Title = noTestsStub.title('div');
const Message = noTestsStub.message('div');

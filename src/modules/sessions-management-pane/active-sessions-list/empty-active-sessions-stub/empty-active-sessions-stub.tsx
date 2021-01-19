import { BEM } from '@redneckz/react-bem-helper';
import { Icons, Panel } from '@drill4j/ui-kit';

import styles from './empty-active-sessions-stub.module.scss';

interface Props {
  className?: string;
}

const emptyActiveSessionsStub = BEM(styles);

export const EmptyActiveSessionsStub = emptyActiveSessionsStub(
  ({ className }: Props) => (
    <div className={className}>
      <Panel direction="column">
        <Icons.Test width={120} height={134} viewBox="0 0 18 20" data-test="empty-active-sessions-stub:test-icon" />
        <Title data-test="empty-active-sessions-stub:title">There are no active sessions</Title>
        <Message data-test="empty-active-sessions-stub:message">You can use this menu to start new.</Message>
      </Panel>
    </div>
  ),
);

const Title = emptyActiveSessionsStub.title('div');
const Message = emptyActiveSessionsStub.message('div');

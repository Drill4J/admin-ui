import { BEM } from '@redneckz/react-bem-helper';
import { Icons, Panel } from '@drill4j/ui-kit';

import styles from './no-scope-stub.module.scss';

interface Props {
  className?: string;
}

const noScopeStub = BEM(styles);

export const NoScopeStub = noScopeStub(({ className }: Props) => (
  <div className={className}>
    <Panel direction="column">
      <Icons.Scope width={157} height={157} data-test="no-scope-stub:test-icon" />
      <Title data-test="no-scope-stub:title">No scopes found</Title>
      <Message data-test="no-scope-stub:message">There are no scopes with finished test sessions in this build.</Message>
    </Panel>
  </div>
));

const Title = noScopeStub.title('div');
const Message = noScopeStub.message('div');

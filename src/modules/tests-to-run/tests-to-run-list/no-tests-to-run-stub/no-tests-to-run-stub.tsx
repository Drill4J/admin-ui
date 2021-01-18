import { BEM } from '@redneckz/react-bem-helper';
import { Icons } from '@drill4j/ui-kit';

import styles from './no-tests-to-run-stub.module.scss';

interface Props {
  className?: string;
}

const noTestsToRunStub = BEM(styles);

export const NoTestsToRunStub = noTestsToRunStub(({ className }: Props) => (
  <div className={className}>
    <Icon width={80} height={80} />
    <Title>No suggested tests</Title>
    <SubTitle>There is no information about the suggested to run tests<br /> in this build.</SubTitle>
  </div>
));

const Icon = noTestsToRunStub.icon(Icons.Test);
const Title = noTestsToRunStub.title('div');
const SubTitle = noTestsToRunStub.subTitle('div');

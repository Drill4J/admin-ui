import { BEM } from '@redneckz/react-bem-helper';
import { Icons } from '@drill4j/ui-kit';

import styles from './no-data-stub.module.scss';

interface Props {
  className?: string;
}

const noDataStub = BEM(styles);

export const NoDataStub = noDataStub(({ className }: Props) => (
  <div className={className}>
    <Icon width={70} height={75} />
    <Title>No data about saved time</Title>
    <SubTitle>There is no information about Auto tests duration in the parent build.</SubTitle>
  </div>
));

const Icon = noDataStub.icon(Icons.Graph);
const Title = noDataStub.title('div');
const SubTitle = noDataStub.subTitle('div');

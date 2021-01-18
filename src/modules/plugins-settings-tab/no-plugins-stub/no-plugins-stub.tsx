import { BEM } from '@redneckz/react-bem-helper';
import { Icons } from '@drill4j/ui-kit';

import styles from './no-plugins-stub.module.scss';

interface Props {
  className?: string;
  children: string;
}

const noPluginsStub = BEM(styles);

export const NoPluginsStub = noPluginsStub(({ className, children }: Props) => (
  <div className={className}>
    <Icon height={160} width={160} />
    <Title>No plugins installed</Title>
    <SubTitle>{children}</SubTitle>
  </div>
));

const Icon = noPluginsStub.icon(Icons.Plugins);
const Title = noPluginsStub.title('div');
const SubTitle = noPluginsStub.subTitle('div');

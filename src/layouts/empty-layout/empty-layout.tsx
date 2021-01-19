import { BEM } from '@redneckz/react-bem-helper';

import styles from './empty-layout.module.scss';

interface Props {
  className?: string;
  children: React.ReactNode;
}

const emptyLayout = BEM(styles);

export const EmptyLayout = emptyLayout(({ className, children }: Props) => (
  <div className={className}>
    <Container>
      <Header>
        <Logo />
      </Header>
      <Content>{children}</Content>
    </Container>
  </div>
));

const Container = emptyLayout.container('div');
const Header = emptyLayout.header('div');
const Logo = emptyLayout.logo('div');
const Content = emptyLayout.content('div');

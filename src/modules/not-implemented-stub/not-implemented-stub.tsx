import { BEM } from '@redneckz/react-bem-helper';

import { ReactComponent as LogoSvg } from './logo.svg';

import styles from './not-implemented-stub.module.scss';

interface Props {
  className?: string;
}

const notImplementedStub = BEM(styles);

export const NotImplementedStub = notImplementedStub(({ className }: Props) => (
  <div className={className}>
    <LogoSvg />
    <Message>Uh-oh, a bit too soon!</Message>
    <Instructions>
      This page is not ready yet, but we&apos;re doing our best to bring it to you as soon as humanly possible. Stay tuned!
    </Instructions>
  </div>
));

const Message = notImplementedStub.message('div');
const Instructions = notImplementedStub.instructions('div');

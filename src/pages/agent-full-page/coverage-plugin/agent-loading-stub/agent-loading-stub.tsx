import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { ReactComponent as LogoSvg } from './logo.svg';

import styles from './agent-loading-stub.module.scss';

interface Props {
  className?: string;
}

const agentLoadingStub = BEM(styles);

export const AgentLoadingStub = agentLoadingStub(({ className }: Props) => (
  <div className={className}>
    <Logo />
    <Message>Please wait a moment, agent is loading</Message>
  </div>
));

const Logo = agentLoadingStub.logo(LogoSvg);
const Message = agentLoadingStub.message('div');

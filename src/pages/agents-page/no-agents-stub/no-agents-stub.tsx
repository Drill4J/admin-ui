import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { ReactComponent as NoAgentsSvg } from './no-agents.svg';

import styles from './no-agents-stub.module.scss';

interface Props {
  className?: string;
}

const noAgentsStub = BEM(styles);

export const NoAgentsStub = noAgentsStub(({ className }: Props) => (
  <div className={className}>
    <NoAgentsSvg />
    <Title>No agents online at the moment</Title>
    <SubTitle>For agent to appear here turn it on in your project folder.</SubTitle>
  </div>
));

const Title = noAgentsStub.title('div');
const SubTitle = noAgentsStub.subTitle('div');

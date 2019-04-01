import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import styles from './card.module.scss';

interface Props {
  className?: string;
  title?: string;
  text?: number | string;
  secondaryText?: React.ReactNode;
}

const card = BEM(styles);

export const Card = card(({ className, title, text, secondaryText }: Props) => (
  <div className={className}>
    <Title>{title}</Title>
    <MainText color="green">{text}</MainText>
    <SecondaryText>{secondaryText}</SecondaryText>
  </div>
));

const Title = card.title('div');
const MainText = card.mainText(div({ color: undefined } as { color?: 'green' | 'red' }));
const SecondaryText = card.secondaryText('div');

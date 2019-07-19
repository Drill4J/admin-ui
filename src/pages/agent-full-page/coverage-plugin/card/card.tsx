import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import styles from './card.module.scss';

interface Props {
  className?: string;
  header?: React.ReactNode;
  children: React.ReactElement | React.ReactElement[];
}

const card = BEM(styles);

export const Card = card(({ className, header, children }: Props) => (
  <div className={className}>
    <Header>{header}</Header>
    <Content>
      {React.Children.map(children, (child: React.ReactElement<any>) => (
        <CardSectionContent>
          <CardSectionLabel>{child.props.header}</CardSectionLabel>
          <span>{child}</span>
        </CardSectionContent>
      ))}
    </Content>
  </div>
));

const Header = card.header('div');
const Content = card.content('div');
export const CardSection = card.section(div({ header: undefined } as { header?: React.ReactNode }));
const CardSectionContent = card.sectionContent('div');
const CardSectionLabel = card.sectionLabel('div');

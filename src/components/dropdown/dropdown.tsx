import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import { Icons } from '../icon';

import styles from './dropdown.module.scss';

interface DropdownItem {
  value: string;
  label: string;
}

interface Props {
  className?: string;
  items: DropdownItem[];
  value: DropdownItem;
  onChange: (arg: DropdownItem) => void;
}

const dropdown = BEM(styles);

export const Dropdown = dropdown(({ className, items, value, onChange }: Props) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <div className={className}>
      <Container onClick={() => setIsExpanded(!isExpanded)}>
        <Value>{value.label}</Value>
        <Icon>
          <Icons.Expander />
        </Icon>
      </Container>
      {isExpanded && (
        <ItemsListWrapper>
          <ItemsList>
            {items.map((item) => (
              <Item
                onClick={() => {
                  onChange(item);
                  setIsExpanded(false);
                }}
                selected={value.value === item.value}
                key={item.value}
              >
                {item.label}
              </Item>
            ))}
          </ItemsList>
        </ItemsListWrapper>
      )}
    </div>
  );
});

const Container = dropdown.container('div');
const Value = dropdown.value('div');
const Icon = dropdown.icon('div');
const ItemsListWrapper = dropdown.itemListWrapper('div');
const ItemsList = dropdown.itemsList('div');
const Item = dropdown.item(
  div({ onClick: () => {} } as { selected?: boolean; onClick: (arg: DropdownItem) => void }),
);

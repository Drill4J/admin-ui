import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Icons } from '../../../components';
import { Panel } from '../../../layouts';
import { useClickOutside } from '../../../hooks';

import styles from './dropdown.module.scss';

interface DropdownItem {
  value: string;
  label: string;
}

interface Props {
  className?: string;
  items: DropdownItem[];
  value: string;
  onChange: (arg: DropdownItem) => void;
}

const dropdown = BEM(styles);

export const Dropdown = dropdown(({ className, items, value, onChange }: Props) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const node = useClickOutside(() => setIsExpanded(false));
  const selectedValue = items.find((item) => value === item.value);

  return (
    <div className={className} ref={node}>
      <Container onClick={() => setIsExpanded(!isExpanded)}>
        <Value>{selectedValue && selectedValue.label}</Value>
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
                key={item.value}
              >
                <SelectedIcon>{value === item.value && <Icons.Check />}</SelectedIcon>
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
const Item = dropdown.item('div');
const SelectedIcon = dropdown.selectedIcon(Panel);

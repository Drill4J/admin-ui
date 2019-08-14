import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import { Icons } from '../../../components';

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
  const node = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    function handleClick(event: any) {
      if (node && node.current && node.current.contains(event.target)) {
        return;
      }
      setIsExpanded(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);
  const selectedValue = items.find((item) => value === item.value);

  return (
    <div className={className} ref={node}>
      <Container onClick={() => setIsExpanded(!isExpanded)}>
        <Value>{selectedValue && `Build ${selectedValue.label}`}</Value>
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
                selected={value === item.value}
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

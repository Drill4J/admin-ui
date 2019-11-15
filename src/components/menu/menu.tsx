import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Icons } from '../icon';
import { toLowerCaseWithoutSpaces } from '../../utils';

import styles from './menu.module.scss';

interface Props {
  className?: string;
  items: Array<{ label: string; icon: keyof typeof Icons; onClick: () => void }>;
}

const menu = BEM(styles);

export const Menu = menu(({ className, items }: Props) => {
  const [isListOpened, setIsListOpened] = React.useState(false);
  const node = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    function handleClick(event: any) {
      if (node && node.current && node.current.contains(event.target)) {
        return;
      }
      setIsListOpened(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);
  return (
    <div className={className} ref={node}>
      <MenuIcon onClick={() => setIsListOpened(!isListOpened)} data-test="menu:menu-icon" />
      {isListOpened && (
        <ItemsList>
          {items.map(({ icon, label, onClick }, index) => {
            const ItemIcon = Icons[icon];
            return (
              <Item
                onClick={onClick}
                key={index}
                data-test={`menu:item:${toLowerCaseWithoutSpaces(label)}`}
              >
                <ItemIcon />
                <ItemLabel>{label}</ItemLabel>
              </Item>
            );
          })}
        </ItemsList>
      )}
    </div>
  );
});

const MenuIcon = menu.menuIcon(Icons.MoreOptions);
const ItemsList = menu.itemsList('div');
const Item = menu.item('div');
const ItemLabel = menu.itemLabel('span');

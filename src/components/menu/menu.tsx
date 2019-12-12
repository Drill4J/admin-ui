import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import VisibilitySensor from 'react-visibility-sensor';

import { Icons } from 'components';

import styles from './menu.module.scss';

interface Props {
  className?: string;
  items: Array<{ label: string; icon: keyof typeof Icons; onClick: () => void }>;
  bordered?: boolean;
}

const menu = BEM(styles);

export const Menu = menu(({ className, items, bordered }: Props) => {
  const [isListOpened, setIsListOpened] = React.useState(false);
  const [position, setPosition] = React.useState<'bottom' | 'top'>('bottom');
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
      <MenuIcon onClick={() => setIsListOpened(!isListOpened)}>
        {bordered ? <Icons.MoreOptionsWithBorder /> : <Icons.MoreOptions />}
        {isListOpened && (
          <VisibilitySensor
            onChange={(isVisible) => {
              !isVisible && setPosition('top');
            }}
          >
            <ItemsList position={position}>
              {items.map(({ icon, label, onClick }, index) => {
                const ItemIcon = Icons[icon];
                return (
                  <Item onClick={onClick} key={index}>
                    <ItemIcon />
                    <ItemLabel>{label}</ItemLabel>
                  </Item>
                );
              })}
            </ItemsList>
          </VisibilitySensor>
        )}
      </MenuIcon>
    </div>
  );
});

const MenuIcon = menu.menuIcon(div({ onClick: () => {} } as { onClick?: () => void }));
const ItemsList = menu.itemsList(div({} as { position?: 'bottom' | 'top' }));
const Item = menu.item('div');
const ItemLabel = menu.itemLabel('span');

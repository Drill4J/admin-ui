import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import VisibilitySensor from 'react-visibility-sensor';

import { Icons } from 'components';
import { useClickOutside } from 'hooks';

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
  const node = useClickOutside(() => setIsListOpened(false));

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
                    <ItemIcon width={16} height={16} />
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

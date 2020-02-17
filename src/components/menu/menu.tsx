import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';
import VisibilitySensor from 'react-visibility-sensor';
import nanoid from 'nanoid';

import { Icons } from 'components';
import { useClickOutside } from 'hooks';
import { spacesToDashes } from 'utils';
import { MenuItemType } from './menu-item-type';

import styles from './menu.module.scss';

interface Props {
  className?: string;
  items: MenuItemType[];
  bordered?: boolean;
  testContext?: string;
}

const menu = BEM(styles);

export const Menu = menu(({
  className, items, bordered, testContext,
}: Props) => {
  const [isListOpened, setIsListOpened] = React.useState(false);
  const [position, setPosition] = React.useState<'bottom' | 'top'>('bottom');
  const node = useClickOutside(() => setIsListOpened(false));

  return (
    <div className={className} ref={node}>
      <MenuIcon onClick={() => setIsListOpened(!isListOpened)} data-test={`menu:icon:${testContext}`}>
        {bordered ? <Icons.MoreOptionsWithBorder /> : <Icons.MoreOptions />}
        {isListOpened && (
          <VisibilitySensor
            onChange={(isVisible) => {
              !isVisible && setPosition('top');
            }}
          >
            <ItemsList position={position}>
              {items.map(({ icon, label, onClick }) => {
                const ItemIcon = Icons[icon];
                return (
                  <Item onClick={onClick} key={nanoid()} data-test={`menu:item:${spacesToDashes(label)}`}>
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

const MenuIcon = menu.menuIcon(div({ onClick: () => {}, 'data-test': '' } as { onClick?: () => void; 'data-test'?: string }));
const ItemsList = menu.itemsList(div({} as { position?: 'bottom' | 'top' }));
const Item = menu.item('div');
const ItemLabel = menu.itemLabel('span');

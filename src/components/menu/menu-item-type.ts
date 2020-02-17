import { Icons } from 'components/icon';

export interface MenuItemType {
  label: string;
  icon: keyof typeof Icons;
  onClick: () => void;
}

import { BEM, div } from '@redneckz/react-bem-helper';
import { Icons } from '@drill4j/ui-kit';

import styles from './row-expander.module.scss';

interface Props {
  className?: string;
  expanded?: boolean;
  onClick: () => void;
}

const rowExpander = BEM(styles);

export const RowExpander = rowExpander(({
  className, expanded, onClick,
}: Props) => (
  <div className={className} onClick={onClick}>
    <IconWrapper expanded={expanded} data-test="row-expander">
      <Icons.Expander />
    </IconWrapper>
  </div>
));

const IconWrapper = rowExpander.icon(div({ 'data-test': '' } as { expanded?: boolean; 'data-test': string }));

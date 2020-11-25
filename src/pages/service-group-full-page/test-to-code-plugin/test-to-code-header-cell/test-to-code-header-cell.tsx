import * as React from 'react';
import { Icons } from '@drill4j/ui-kit';
import { BEM, div } from '@redneckz/react-bem-helper';

import { spacesToDashes } from 'utils';

import styles from './test-to-code-header-cell.module.scss';

interface Props {
  className?: string;
  label: string;
  value?: string | number;
  onClick?: () => void;
}

const testToCodeHeaderCell = BEM(styles);

export const TestToCodeHeaderCell = testToCodeHeaderCell(({
  className, label, value, onClick,
}: Props) => (
  <div className={className}>
    <Content>
      <Label>{label}</Label>
      <Value
        onClick={onClick}
        clickable={Boolean(value && onClick)}
        data-test={`dashboard-header-cell:${spacesToDashes(label)}:value`}
      >
        {value}
        {Boolean(onClick && value) && <LinkIcon height={8} />}
      </Value>
    </Content>
  </div>
));

const Content = testToCodeHeaderCell.content('div');
const Label = testToCodeHeaderCell.label('div');
const Value = testToCodeHeaderCell.value(
  div({ onClick: () => {}, 'data-test': '' } as { onClick?: () => void; clickable?: boolean;'data-test'?: string }),
);
const LinkIcon = testToCodeHeaderCell.linkIcon(Icons.Expander);

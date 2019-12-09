import * as React from 'react';
import { BEM, div } from '@redneckz/react-bem-helper';

import { Icons } from '../../../../components';

import styles from './coverage-rate-icon.module.scss';

interface Props {
  className?: string;
  coverageRate?: 'MISSED' | 'PARTLY' | 'FULL';
}

const coverageRateIcon = BEM(styles);

export const CoverageRateIcon = coverageRateIcon(({ className, coverageRate }: Props) => (
  <div className={className}>
    <IconWrapper rate={coverageRate}>
      {coverageRate === 'FULL' ? (
        <Icons.Checkbox height={16} width={16} />
      ) : (
        <Icons.Warning height={16} width={16} />
      )}
    </IconWrapper>
  </div>
));

const IconWrapper = coverageRateIcon.iconWrapper(div({} as { rate?: string }));

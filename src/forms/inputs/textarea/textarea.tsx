import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import styles from './textarea.module.scss';

interface Props {
  className?: string;
  value: string;
  onChange: (event: React.SyntheticEvent<HTMLTextAreaElement>) => void;
}

const textarea = BEM(styles);

export const Textarea = textarea(({ className, ...rest }: Props) => (
  <textarea className={className} {...rest} />
));

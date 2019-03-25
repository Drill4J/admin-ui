import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Input } from '../input';
import styles from './toggler.module.scss';

interface Attrs {
  className?: string;
  label?: React.ReactNode;
  value?: string | boolean;
  disabled?: boolean;
  size?: 'small';
  onChange?: () => void;
}

const checkbox = BEM(styles);

export const Toggler = checkbox(({ className, label, value, onChange = () => {} }: Attrs) => (
  <label className={className}>
    <React.Fragment>
      <CheckboxInput type="checkbox" checked={Boolean(value)} value={value} onChange={onChange} />
      <CheckboxTogglerLabel />
    </React.Fragment>
    {label && <Label checked={Boolean(value)}>{label}</Label>}
  </label>
));

const CheckboxInput = checkbox.input(Input);
const CheckboxTogglerLabel = checkbox.slider('span');
const Label = checkbox.label('div');

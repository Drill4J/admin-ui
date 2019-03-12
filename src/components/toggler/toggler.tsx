import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Input } from '../input';
import styles from './toggler.module.scss';

interface Attrs {
  className?: string;
  label?: string;
  value?: string | boolean;
  disabled?: boolean;
  withoutControl?: boolean;
  size?: 'small';
  onChange?: () => void;
}

const checkbox = BEM(styles);

export const Toggler = checkbox(
  ({ className, label, value, withoutControl = false, onChange }: Attrs) => (
    <label className={className}>
      {!withoutControl && (
        <React.Fragment>
          <CheckboxInput
            type="checkbox"
            checked={Boolean(value)}
            value={value}
            onChange={onChange}
          />

          <CheckboxTogglerLabel />
        </React.Fragment>
      )}
      {label && <span>{label}</span>}
    </label>
  ),
);

const CheckboxInput = checkbox.input(Input);
const CheckboxTogglerLabel = checkbox.togglerLabel('span');

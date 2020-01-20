import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { DropdownInput } from '../inputs';
import { ErrorMessage } from './error-message';
import { DropdownItem } from '../inputs/dropdown-input/dropdown-item';

interface Props extends FieldRenderProps<any> {
  options?: DropdownItem[];
}

export const dropdownField = (props: Props) => {
  const {
    input: { onChange, ...input },
    meta,
    options = [],
    ...rest
  } = props;
  return (
    <>
      <DropdownInput
        {...input}
        {...rest}
        options={options}
        value={options.find(({ value }: { value: string }) => value === input.value)}
        onChange={({ value }: DropdownItem) => onChange(value)}
        error={(meta.error || meta.submitError) && meta.touched}
      />
      {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
    </>
  );
};

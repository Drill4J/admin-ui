import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { DropdownInput } from '../../components';
import { ErrorMessage } from './error-message';
import { DropdownItem } from '../../components/dropdown-input/dropdown-input';

interface Props extends FieldRenderProps<any> {
  options?: DropdownItem[];
}

export const dropdownField = (props: Props) => {
  const {
    input: { onChange, ...input },
    meta,
    options = [],
    // tslint:disable-next-line
    ...rest
  } = props;
  return (
    <>
      <DropdownInput
        {...input}
        {...rest}
        options={options}
        value={options.find(({ value }: { value: string }) => value === input.value)}
        onChange={({ value }: DropdownItem) => value}
        error={(meta.error || meta.submitError) && meta.touched}
      />
      {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
    </>
  );
};

import * as React from 'react';
import { FieldRenderProps } from 'react-final-form';

import { ErrorMessage } from './error-message';

export const field = (Input: React.ElementType) => (props: FieldRenderProps<any>) => {
  const { input, meta, ...rest } = props;
  return (
    <>
      <Input {...input} {...rest} error={(meta.error || meta.submitError) && meta.touched} />
      {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
    </>
  );
};

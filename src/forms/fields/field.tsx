import { FieldRenderProps } from 'react-final-form';

import { ErrorMessage } from './error-message';

export const field = <T, >(Input: React.ElementType) => (props: FieldRenderProps<T>) => {
  const { input, meta, ...rest } = props;
  const isError = (meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) && meta.touched;
  return (
    <>
      <Input {...input} {...rest} error={isError} />
      {isError && <ErrorMessage>{meta.error || meta.submitError}</ErrorMessage>}
    </>
  );
};

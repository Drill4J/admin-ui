import { BEM } from '@redneckz/react-bem-helper';
import { Inputs } from '@drill4j/ui-kit';
import { FieldRenderProps } from 'react-final-form';

import styles from './threshold-value-field.module.scss';

interface Props extends FieldRenderProps<string> {
  className?: string;
  children: React.ReactNode;
}

const thresholdValueField = BEM(styles);

export const ThresholdValueField = thresholdValueField(
  (props: Props) => {
    const {
      className, children, input, meta, ...rest
    } = props;
    return (
      <div className={className} data-test="threshold-value-field">
        <div>
          {children}
          {meta.error && meta.touched && <ErrorMessage>{meta.error}</ErrorMessage>}
        </div>
        <Inputs.Number {...input} {...rest} error={(meta.error || meta.submitError) && meta.touched} />
      </div>
    );
  },
);

const ErrorMessage = thresholdValueField.errorMessage('div');

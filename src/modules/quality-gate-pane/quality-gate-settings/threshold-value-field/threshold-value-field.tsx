/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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

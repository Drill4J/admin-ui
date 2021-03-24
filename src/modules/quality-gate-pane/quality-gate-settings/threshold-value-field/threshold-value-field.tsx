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
import { Inputs } from '@drill4j/ui-kit';
import { FieldRenderProps } from 'react-final-form';
import 'twin.macro';

interface Props extends FieldRenderProps<string> {
  children: React.ReactNode;
}

export const ThresholdValueField = (props: Props) => {
  const {
    children, input, meta, ...rest
  } = props;
  return (
    <div tw="contents" data-test="threshold-value-field">
      <div>
        {children}
        {meta.error && meta.touched && <div tw="text-10 leading-12 text-red-default">{meta.error}</div>}
      </div>
      <Inputs.Number {...input} {...rest} error={(meta.error || meta.submitError) && meta.touched} />
    </div>
  );
};

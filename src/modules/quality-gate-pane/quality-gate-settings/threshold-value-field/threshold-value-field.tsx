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
import { useEffect, useRef } from 'react';
import { FieldRenderProps } from 'react-final-form';
import tw, { styled } from 'twin.macro';

interface Props extends FieldRenderProps<string> {
  children: React.ReactNode;
}

const NumberInput = styled.input`
  width: 60px;
  height: 32px;
  ${tw`py-0 px-2 text-right text-14 leading-22 text-monochrome-black`};
  ${tw`rounded border border-monochrome-medium-tint bg-monochrome-white outline-none`};


  -moz-appearance: textfield;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  
  :focus {
    ${tw`border border-monochrome-black`};
  }

  ::placeholder {
    ${tw`text-monochrome-default`};
  }
  ${({ disabled }) =>
    disabled &&
    tw`border border-monochrome-medium-tint bg-monochrome-light-tint text-monochrome-default`}
  ${({ error }: { error: string }) => error && tw`border border-red-default`}
`;

export const ThresholdValueField = (props: Props) => {
  const {
    children, input, meta, disabled,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (disabled) {
      input.onChange({
        target: {
          value: undefined,
        },
      });
    } else {
      inputRef.current && inputRef.current.focus();
    }
  }, [disabled]);

  return (
    <div tw="contents" data-test="threshold-value-field">
      <div>
        {children}
        {meta.error && meta.touched && <div tw="text-10 leading-12 text-red-default">{meta.error}</div>}
      </div>
      <NumberInput
        {...input}
        ref={inputRef}
        disabled={disabled}
        error={(meta.error || meta.submitError) && meta.touched}
      />
    </div>
  );
};

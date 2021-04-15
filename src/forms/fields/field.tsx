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
import { usePreserveCaretPosition } from 'hooks';
import { FieldRenderProps } from 'react-final-form';
import { convertToSingleSpaces } from 'utils';
import tw, { styled } from 'twin.macro';

const ErrorMessage = styled.div`
  ${tw`text-12 leading-24 whitespace-nowrap text-red-default`};

  &::first-letter {
    text-transform: uppercase;
  }
`;

export const field = <T, >(Input: React.ElementType) => (props: FieldRenderProps<T>) => {
  const {
    input, meta, replacer, ...rest
  } = props;
  const isError = (meta.error || (meta.submitError && !meta.dirtySinceLastSubmit)) && meta.touched;
  const handleOnChange = usePreserveCaretPosition(replacer || convertToSingleSpaces);

  return (
    <>
      <Input
        {...input}
        {...rest}
        error={isError}
        onBlur={(event: React.ChangeEvent<HTMLInputElement>) => {
          input.onBlur();
          input.onChange({ target: { value: event.target.value.trimEnd() } });
        }}
        onChange={input.type === 'checkbox' ? input.onChange : (event: React.ChangeEvent<HTMLInputElement>) => handleOnChange(input, event)}
      />
      {isError && <ErrorMessage>{meta.error || meta.submitError}</ErrorMessage>}
    </>
  );
};

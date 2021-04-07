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
import { useRunAfterUpdate } from './use-run-after-update';

export const usePreserveCaretPosition = (converter: (str: string) => string) => {
  const runAfterUpdate = useRunAfterUpdate();

  const parse = (value: string, caretPosition: number) => {
    const beforeCaret = value.slice(0, caretPosition);
    const afterCaret = value.slice(caretPosition, value.length);

    const parseBeforeCaret = converter(beforeCaret);
    const parseAfterCaret = converter(afterCaret);

    const newValue = parseBeforeCaret + parseAfterCaret;
    const preserveCaret = parseBeforeCaret.length;

    return [newValue, preserveCaret];
  };

  const handleOnChange = ({ onChange }: any, event: any) => {
    const input = event.target;
    const [newValue, preserveCaret] = parse(event.target.value, input.selectionStart);
    onChange({
      target: {
        value: newValue,
      },
    });
    runAfterUpdate(() => {
      input.selectionStart = preserveCaret;
      input.selectionEnd = preserveCaret;
    });
  };

  return handleOnChange;
};

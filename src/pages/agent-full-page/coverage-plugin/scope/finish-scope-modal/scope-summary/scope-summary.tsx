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
import tw, { styled } from 'twin.macro';

import { ActiveScope } from 'types/active-scope';
import { formatMsToDate, percentFormatter } from 'utils';

interface Props {
  scope: ActiveScope;
  testsCount: number;
}

const Element = styled.div(() => [
  tw`flex justify-between pt-3 pb-2`,
  tw`border-b border-monochrome-medium-tint text-14 leading-20`,
]);
const ElementValue = styled.div`
  ${tw`font-bold text-14`}
`;

export const ScopeSummary = ({ scope, testsCount }: Props) => {
  const { coverage: { percentage = 0 } = {}, started } = scope || {};
  return (
    <div tw="w-full h-full">
      <div tw="w-full pb-1 font-bold text-14 leading-20">Scope Summary</div>
      <Element>
        Code coverage
        <ElementValue data-test="finish-scope-modal:scope-summary:code-coverage">
          {`${percentFormatter(percentage)}%`}
        </ElementValue>
      </Element>
      <Element>
        Tests
        <ElementValue data-test="finish-scope-modal:scope-summary:tests-count">{testsCount}</ElementValue>
      </Element>
      <Element>
        Duration
        <ElementValue data-test="finish-scope-modal:scope-summary:duration">{getTimeString(started)}</ElementValue>
      </Element>
    </div>
  );
};

function getTimeString(started?: number) {
  const duration = started ? Date.now() - started : 0;
  const { days, hours, minutes } = formatMsToDate(duration);

  return `${days}d ${hours}h ${minutes}m`;
}

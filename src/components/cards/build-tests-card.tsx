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
import { percentFormatter } from 'utils';
import { TestTypeSummary } from 'types/test-type-summary';
import 'twin.macro';

import { Card, Label, TotalCount } from './card-styles';

interface Props {
  label: string;
  testTypeSummary?: TestTypeSummary;
}

export const BuildTestsCard = ({ label, testTypeSummary }: Props) => {
  const { summary: { testCount = 0, coverage: { percentage = 0 } = {} } = {} } =
    testTypeSummary || {};
  return (
    <Card>
      <div className="flex justify-between items-center w-full">
        <Label data-test={`build-tests-card:label:${label}`}>{label}</Label>
        <TotalCount data-test={`build-tests-card:total-count:${label}`}>{testCount}</TotalCount>
      </div>
      <span
        tw="w-full font-regular text-24 leading-24 text-monochrome-black"
        data-test={`build-tests-card:percentage:${label}`}
      >
        {percentFormatter(percentage)}%
        <span tw="text-12 leading-16 ml-1 text-monochrome-default">methods covered</span>
      </span>
    </Card>
  );
};

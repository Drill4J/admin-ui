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
import { convertToPercentage } from 'utils';
import 'twin.macro';

import { Card, Label, TotalCount } from './card-styles';

interface Props {
  children?: React.ReactNode;
  covered?: number;
  totalCount?: number;
  label: string;
  testContext?: string;
}

export const BuildMethodsCard = ({
  children,
  covered = 0,
  totalCount = 0,
  label,
  testContext,
}: Props) => (
  <Card>
    <div className="flex justify-between items-center w-full">
      <Label data-test={`build-methods-card:label:${label}`}>{label}</Label>
      <TotalCount data-test={`build-methods-card:total-count:${label}`}>{totalCount}</TotalCount>
    </div>
    <div tw="w-full text-12 leading-16 text-monochrome-default">
      <div className="flex justify-between items-center w-full">
        <div
          tw="font-bold text-16 leading-18"
          data-test={`build-methods-card:covered-count:${label}`}
        >
          {covered}
        </div>
        <span data-test={`build-methods-card:${testContext}`}>{children}</span>
      </div>
      <div tw="h-2 mt-1 rounded-sm bg-monochrome-light-tint">
        <div
          tw="h-2 rounded-sm bg-data-visualization-scrollbar-thumb"
          style={{ width: `${convertToPercentage(covered, totalCount)}%` }}
        />
      </div>
    </div>
  </Card>
);

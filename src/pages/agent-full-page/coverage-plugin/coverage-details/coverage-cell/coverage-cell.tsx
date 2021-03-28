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
import { Icons } from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

import { percentFormatter } from 'utils';

const IconWrapper = styled.div(({ type }: { type?: 'success' | 'error' | 'warning' }) => [
  tw`flex items-center`,
  type === 'warning' && tw`text-orange-default`,
  type === 'error' && tw`text-red-default`,
  type === 'success' && tw`text-monochrome-default`,
]);

const Content = styled.div(({ showCoverageIcon } : { showCoverageIcon: boolean }) => [
  tw`inline-flex items-center gap-4 font-bold`,
  !showCoverageIcon && tw`pr-8`,
]);

export const CoverageCell = ({ value = 0, showCoverageIcon }: { value: number, showCoverageIcon: boolean }) => (
  <Content showCoverageIcon={showCoverageIcon}>
    <span data-test="coverage-cell:coverage">{`${percentFormatter(value)}%`}</span>
    {showCoverageIcon && getCoverageIcon(value)}
  </Content>
);

function getCoverageIcon(coverage: number) {
  if (!coverage) {
    return (
      <IconWrapper type="error">
        <Icons.Cancel height={16} width={16} />
      </IconWrapper>
    );
  }
  if (coverage === 100) {
    return (
      <IconWrapper type="success">
        <Icons.Checkbox height={16} width={16} />
      </IconWrapper>
    );
  }

  return (
    <IconWrapper type="warning">
      <Icons.Warning height={16} width={16} />
    </IconWrapper>
  );
}

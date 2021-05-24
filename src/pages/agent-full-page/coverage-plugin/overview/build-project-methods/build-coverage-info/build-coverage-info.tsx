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
import { NavLink, useParams } from 'react-router-dom';
import { MainProgressBar, ProgressBarLegends } from '@drill4j/ui-kit';
import 'twin.macro';

import { percentFormatter } from 'utils';
import { PreviousBuildInfo } from '../previous-build-info-types';

interface Props {
  buildCodeCoverage: number;
  previousBuildInfo?: PreviousBuildInfo;
}

export const BuildCoverageInfo = ({
  buildCodeCoverage,
  previousBuildInfo: { previousBuildVersion = '', previousBuildCodeCoverage = 0 } = {},
}: Props) => {
  const { agentId, buildVersion, pluginId } =
    useParams<{ agentId: string; buildVersion: string; pluginId: string }>();
  const buildDiff =
    percentFormatter(buildCodeCoverage) - percentFormatter(previousBuildCodeCoverage);
  return (
    <div tw="w-full h-full text-12 leading-16 text-monochrome-default">
      <div className="flex justify-between items-center w-full">
        <div tw="font-bold" data-test="build-coverage-info:title">
          BUILD COVERAGE
        </div>
        <NavLink
          className="link font-bold leading-16 no-underline"
          to={`/full-page/${agentId}/${buildVersion}/${pluginId}/scopes/`}
          data-test="build-coverage-info:all-scopes-link"
        >
          All scopes
        </NavLink>
      </div>
      <div
        tw="flex items-baseline mt-6 mb-3 text-12"
        data-test="build-coverage-info:detailed-code-coverage-info"
      >
        <div
          tw="mr-2 text-32 leading-40 text-monochrome-black"
          data-test="build-coverage-info:build-coverage-percentage"
        >
          {percentFormatter(buildCodeCoverage)}%
        </div>
        {previousBuildVersion && buildCodeCoverage > 0 && (
          <span data-test="build-coverage-info:comparing">
            <span tw="font-bold">
              {buildDiff >= 0 ? '+ ' : '- '}
              {percentFormatter(Math.abs(buildDiff))}% &nbsp;
            </span>
            сompared to the parent build
          </span>
        )}
      </div>
      <MainProgressBar type="primary" value={`${buildCodeCoverage}%`} />
      <ProgressBarLegends />
    </div>
  );
};

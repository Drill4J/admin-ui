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

import { BuildTestsCard } from 'components';
import { TestsInfo } from 'types/tests-info';
import { BuildCoverage } from 'types/build-coverage';
import { useBuildVersion } from 'hooks';
import { ActiveBuildTestsInfo } from '../../../active-build-tests-info';

import styles from './scope-project-tests.module.scss';

interface Props {
  className?: string;
  scopeId: string;
}

const scopeProjectTests = BEM(styles);

export const ScopeProjectTests = scopeProjectTests(({ className, scopeId }: Props) => {
  const { byTestType = [] } = useBuildVersion<BuildCoverage>(`/scope/${scopeId}/coverage`) || {};
  const testsInfo: TestsInfo = byTestType.reduce((test, testType) => ({ ...test, [testType.type]: testType }), {});

  return (
    <div className={className}>
      <ActiveBuildTestsInfo testsInfo={testsInfo} />
      <Cards>
        <BuildTestsCard label="AUTO" testTypeSummary={testsInfo.AUTO} />
        <BuildTestsCard label="MANUAL" testTypeSummary={testsInfo.MANUAL} />
      </Cards>
    </div>
  );
});

const Cards = scopeProjectTests.cards('div');

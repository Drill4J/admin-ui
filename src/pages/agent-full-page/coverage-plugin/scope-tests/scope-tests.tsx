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
import { useParams } from 'react-router-dom';

import { TestCoverageInfo } from 'types/test-coverage-info';
import { FilterList } from 'types/filter-list';
import { useBuildVersion } from 'hooks';
import { useTableActionsState } from 'modules';
import { TestDetails } from '../test-details';

export const ScopeTests = () => {
  const { search } = useTableActionsState();
  const { scopeId = '' } = useParams<{ scopeId: string }>();
  const tests = useBuildVersion<FilterList<TestCoverageInfo>>(`/build/scopes/${scopeId}/tests`, search, undefined, 'LIST') || {};

  return (
    <TestDetails
      tests={tests as FilterList<TestCoverageInfo>}
      topicCoveredMethodsByTest={`/build/scopes/${scopeId}/tests`}
    />
  );
};

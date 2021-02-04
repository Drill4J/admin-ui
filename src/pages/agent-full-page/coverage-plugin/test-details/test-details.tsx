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
import { useState } from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import {
  Icons, Column, Table,
} from '@drill4j/ui-kit';

import { capitalize } from 'utils';
import { TestCoverageInfo } from 'types/test-coverage-info';
import { Cells } from 'components';
import { CoveredMethodsByTestSidebar } from 'modules';
import { NoTestsStub } from './no-tests-stub';

import styles from './test-details.module.scss';

interface Props {
  className?: string;
  tests: TestCoverageInfo[];
  topicCoveredMethodsByTest: string;
}

const testDetails = BEM(styles);

export const TestDetails = testDetails(
  ({
    className, tests, topicCoveredMethodsByTest,
  }: Props) => {
    const [selectedTest, setSelectedTest] = useState('');

    return (
      <div className={className}>
        {tests.length > 0 ? (
          <>
            <Title className="d-flex align-items-center w-full">
              Tests
            </Title>
            <Table data={tests} idKey="name" gridTemplateColumns="calc(100% - 664px) 130px 76px 152px 186px 120px">
              <Column
                name="testName"
                label="Name"
                Cell={({ item: { name } }) => (
                  <Cells.Compound cellName={name} cellAdditionalInfo="&ndash;" icon={<Icons.Test height={16} width={16} />} />
                )}
                align="start"
              />
              <Column
                name="type"
                label="Test type"
                Cell={({ value }) => (
                  <>
                    {capitalize(value)}
                  </>
                )}
                align="start"
              />
              <Column
                name="stats.result"
                label="Status"
                Cell={({ value }) => (
                  <Cells.TestStatus
                    type={value}
                  >
                    {capitalize(value)}
                  </Cells.TestStatus>
                )}
                align="start"
              />
              <Column
                name="coverage.percentage"
                label="Coverage, %"
                Cell={Cells.Coverage}
              />
              <Column
                name="coverage.methodCount.covered"
                label="Methods covered"
                Cell={({ value, item: { id = '' } = {} }) => (
                  <Cells.Clickable
                    onClick={() => {
                      setSelectedTest(id);
                    }}
                    data-test="test-actions:view-curl:id"
                    disabled={!value}
                  >
                    {value}
                  </Cells.Clickable>
                )}
              />
              <Column
                name="stats.duration"
                label="Duration"
                Cell={Cells.Duration}
              />,
            </Table>
          </>
        ) : (
          <NoTestsStub />
        )}
        {Boolean(selectedTest) && (
          <CoveredMethodsByTestSidebar
            isOpen={Boolean(selectedTest)}
            onToggle={() => setSelectedTest('')}
            testId={selectedTest}
            topicCoveredMethodsByTest={topicCoveredMethodsByTest}
          />
        )}
      </div>
    );
  },
);

const Title = testDetails.title('div');

import { useState } from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import {
  Icons, Panel, Column, Table,
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
            <Title>
              Tests
            </Title>
            <Table data={tests} idKey="name" gridTemplateColumns="calc(100% - 664px) 130px 76px 152px 186px 120px">
              <Column
                name="testName"
                label="Name"
                Cell={({ item: { id, name } }) => (
                  <Cells.Compound cellName={name} cellAdditionalInfo={id} icon={<Icons.Test height={16} width={16} />} />
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

const Title = testDetails.title(Panel);

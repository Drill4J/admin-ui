import * as React from 'react';
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
    const [selectedTest, setSelectedTest] = React.useState('');

    return (
      <div className={className}>
        {tests.length > 0 ? (
          <>
            <Title>
              Tests
            </Title>
            <Table
              data={tests}
              idKey="name"
              columnsSize="medium"
            >
              <Column
                name="testName"
                label="Name"
                Cell={({ item: { id, name } }) => (
                  <Cells.Compound cellName={name} cellAdditionalInfo={id} icon={<Icons.Test height={16} width={16} />} />
                )}
              />
              <Column
                name="type"
                label="Test type"
                width="104px"
                Cell={({ value }) => (
                  <>
                    {capitalize(value)}
                  </>
                )}
              />
              <Column
                name="stats.result"
                label="Status"
                width="44px"
                Cell={({ value }) => (
                  <Cells.TestStatus
                    type={value}
                  >
                    {capitalize(value)}
                  </Cells.TestStatus>
                )}
              />
              <Column
                name="coverage.percentage"
                label="Coverage, %"
                width="128px"
                Cell={Cells.Coverage}
                align="right"
              />
              <Column
                name="coverage.methodCount.covered"
                label="Methods covered"
                width="160px"
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
                align="right"
              />
              <Column
                name="stats.duration"
                label="Duration"
                width="116px"
                Cell={Cells.Duration}
                align="right"
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

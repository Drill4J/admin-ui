import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import {
  Icons, Panel, Column, Table,
} from '@drill4j/ui-kit';

import { capitalize } from 'utils';
import { AssociatedTests } from 'types/associated-tests';
import { MethodCoveredByTest } from 'types/method-covered-by-test';
import { Cells } from 'components';
import { NoTestsStub } from './no-tests-stub';
import { CoveredMethodsByTestSidebar } from './covered-methods-by-test-sidebar';

import styles from './test-details.module.scss';

interface Props {
  className?: string;
  testsUsages: AssociatedTests[];
  coveredMethodsByTest: MethodCoveredByTest[];
}

const testDetails = BEM(styles);

export const TestDetails = testDetails(
  ({
    className, testsUsages, coveredMethodsByTest,
  }: Props) => {
    const [selectedTest, setSelectedTest] = React.useState('');
    return (
      <div className={className}>
        {testsUsages.length > 0 ? (
          <>
            <Title>
              Tests
            </Title>
            <Table
              data={testsUsages.map(({ tests = [], testType }) => tests.map((test) => ({ ...test, testType }))).flat()}
              idKey="testName"
              columnsSize="medium"
            >
              <Column
                name="testName"
                label="Name"
                Cell={({ item: { id, testName } }) => (
                  <Cells.Compound cellName={testName} cellAdditionalInfo={id} icon={<Icons.Test height={16} width={16} />} />
                )}
              />
              <Column
                name="testType"
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
                name="coverage"
                label="Coverage, %"
                width="128px"
                Cell={Cells.Coverage}
                align="right"
              />
              <Column
                name="methodCalls"
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
            coveredMethods={coveredMethodsByTest}
          />
        )}
      </div>
    );
  },
);

const Title = testDetails.title(Panel);

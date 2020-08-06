import * as React from 'react';
import { BEM, span, div } from '@redneckz/react-bem-helper';
import {
  Icons, OverflowText, Panel, Column, ExpandableTable,
} from '@drill4j/ui-kit';

import { percentFormatter } from 'utils';
import { AssociatedTests } from 'types/associated-tests';
import { MethodCoveredByTest } from 'types/method-covered-by-test';
import { NoTestsStub } from './no-tests-stub';
import { CoveredMethodsByTestSidebar } from './covered-methods-by-test-sidebar';
import { CoveredMethodsByTestTypeSidebar } from './covered-methods-by-test-type-sidebar';

import styles from './test-details.module.scss';

interface Props {
  className?: string;
  testsUsages: AssociatedTests[];
  coveredMethodsByTest: MethodCoveredByTest[];
  coveredMethodsByTestType: MethodCoveredByTest[];
}

const testDetails = BEM(styles);

export const TestDetails = testDetails(
  ({
    className, testsUsages, coveredMethodsByTest, coveredMethodsByTestType,
  }: Props) => {
    const [selectedTest, setSelectedTest] = React.useState('');
    const [selectedTestType, setSelectedTestType] = React.useState('');

    return (
      <div className={className}>
        {testsUsages.length > 0 ? (
          <>
            <Title>
              Tests
            </Title>
            <ExpandableTable
              data={testsUsages}
              idKey="testType"
              columnsSize="medium"
              expandedColumns={[
                <Column name="expander" Cell={() => null} />,
                <Column
                  name="testName"
                  Cell={({ value }) => (
                    <TableCell type="secondary">
                      <Icons.Test />
                      <TableCellContent>{value}</TableCellContent>
                    </TableCell>
                  )}
                />,
                <Column
                  name="coverage"
                  Cell={({ value }) => (
                    <CoverageCell>
                      {`${percentFormatter(value)}%`}
                    </CoverageCell>
                  )}
                />,
                <Column
                  name="methodCalls"
                  Cell={({ value, item: { id = '' } = {} }) => (
                    <MethodCallsCell
                      onClick={() => {
                        setSelectedTest(id);
                      }}
                      data-test="test-actions:view-curl:id"
                      clickable={Boolean(value)}
                    >
                      {value}
                    </MethodCallsCell>
                  )}
                />,
              ]}
              expandedContentKey="tests"
            >
              <Column
                name="testType"
                label="Name"
                Cell={({ value, item: { tests = [] } = {} }) => (
                  <TableCell type="primary">
                    <Icons.Test height={16} width={16} />
                    <TableCellContent>
                      {`${value.toLowerCase()} (${
                        tests.length
                      })`}
                    </TableCellContent>
                  </TableCell>
                )}
              />
              <Column
                name="coverage"
                label="Coverage"
                Cell={({ value }) => (
                  <CoverageCell>
                    {`${percentFormatter(value)}%`}
                  </CoverageCell>
                )}
              />
              <Column
                name="methodsCount"
                label="Methods covered"
                Cell={({ value, item: { testType = '' } = {} }) => (
                  <MethodCallsCell
                    onClick={() => {
                      setSelectedTestType(testType);
                    }}
                    data-test="test-actions:view-curl:id"
                    clickable={Boolean(value)}
                  >
                    {value}
                  </MethodCallsCell>
                )}
              />
            </ExpandableTable>
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
        {Boolean(selectedTestType) && (
          <CoveredMethodsByTestTypeSidebar
            isOpen={Boolean(selectedTestType)}
            onToggle={() => setSelectedTestType('')}
            testType={selectedTestType}
            coveredMethods={coveredMethodsByTestType}
          />
        )}
      </div>
    );
  },
);

const Title = testDetails.title(Panel);
const TableCell = testDetails.tableCell(span({} as { type?: 'primary' | 'secondary' }));
const TableCellContent = testDetails.tableCellContent(OverflowText);
const CoverageCell = testDetails.coverageCell('span');
const MethodCallsCell = testDetails.methodCallsCell(
  div({ onClick: () => {} } as { clickable?: boolean }),
);

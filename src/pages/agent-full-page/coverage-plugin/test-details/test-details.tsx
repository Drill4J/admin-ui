import * as React from 'react';
import { BEM, span } from '@redneckz/react-bem-helper';

import { Column, ExpandableTable, Icons, OverflowText } from '../../../../components';
import { Panel } from '../../../../layouts';
import { NoTestsStub } from './no-tests-stub';
import { AssociatedTests } from '../../../../types/associated-tests';
import { percentFormatter } from '../../../../utils';

import styles from './test-details.module.scss';

interface Props {
  className?: string;
  testsUsages: AssociatedTests[];
}

const testDetails = BEM(styles);

export const TestDetails = testDetails(({ className, testsUsages }: Props) => {
  return (
    <div className={className}>
      {testsUsages.length > 0 ? (
        <>
          <Title>
            <span>Tests</span>
            <h2>{testsUsages.length}</h2>
          </Title>
          <ExpandableTable
            data={testsUsages}
            idKey="testType"
            columnsSize="medium"
            expandedColumns={[
              <Column
                name="testName"
                Cell={({ value }) => (
                  <TableCell type="secondary">
                    <Icons.Test />
                    <TableCellContent>{value}</TableCellContent>
                  </TableCell>
                )}
                colSpan={2}
              />,
              <Column
                name="coverage"
                Cell={({ value }) => <span>{percentFormatter(value)}%</span>}
              />,
              <Column name="methodCalls" />,
            ]}
            expandedContentKey="tests"
          >
            <Column
              name="testType"
              label="Name"
              Cell={({ value, item: { tests = [] } = {} }) => (
                <TableCell type="primary">
                  <Icons.Test height={16} width={16} />
                  <TableCellContent>{`${value.toLowerCase()} (${tests.length})`}</TableCellContent>
                </TableCell>
              )}
            />
            <Column
              name="coverage"
              label="Coverage"
              Cell={({ value }) => <span>{percentFormatter(value)}%</span>}
            />
            <Column name="methodsCount" label="Methods covered" />
          </ExpandableTable>
        </>
      ) : (
        <NoTestsStub />
      )}
    </div>
  );
});

const Title = testDetails.title(Panel);
const TableCell = testDetails.tableCell(span({} as { type?: 'primary' | 'secondary' }));
const TableCellContent = testDetails.tableCellContent(OverflowText);

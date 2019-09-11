import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Table, Column } from '../../../../components';
import { Panel } from '../../../../layouts';
import { NoTestsStub } from './no-tests-stub';
import { AssociatedTests } from '../../../../types/associated-tests';

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
          <Table data={testsUsages as any} columnsSize="medium">
            <Column
              name="testName"
              label="Name"
              Cell={({ value }) => <TableCell>{value}</TableCell>}
            />
            <Column
              name="testType"
              label="Type"
              Cell={({ value }) => <TableCell>{value}</TableCell>}
            />
            <Column
              name="methodCalls"
              label="Methods total"
              Cell={({ value }) => <TableCell>{value}</TableCell>}
            />
          </Table>
        </>
      ) : (
        <NoTestsStub />
      )}
    </div>
  );
});

const Title = testDetails.title(Panel);
const TableCell = testDetails.testCell('div');

import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { useWsConnection } from '../../../../hooks';
import { defaultPluginSocket } from '../../../../common/connection';
import { ExpandableTable, Column, Icons } from '../../../../components';
import { Panel } from '../../../../layouts';
import { ClassCoverage } from '../../../../types/class-coverage';
import { NameCell } from './name-cell';
import { CoverageCell } from './coverage-cell';
import { percentFormatter } from '../../../../utils';

import styles from './coverage-details.module.scss';

interface Props {
  className?: string;
}

const coverageDetails = BEM(styles);

export const CoverageDetails = coverageDetails(({ className }: Props) => {
  const coverageByClasses =
    useWsConnection<ClassCoverage[]>(defaultPluginSocket, '/coverage-by-classes') || [];

  return (
    <div className={className}>
      <Header align="space-between">Details</Header>

      {coverageByClasses.length > 0 && (
        <>
          <Title>
            <span>Classes</span>
            <h2>{coverageByClasses.length}</h2>
          </Title>
          <ExpandableTable
            data={coverageByClasses}
            idKey="name"
            columnsSize="medium"
            expandedColumns={[
              <Column
                name="name"
                colSpan={2}
                Cell={(props) => <NameCell pathKey="desc" withMargin {...props} />}
              />,
              <Column name="coverage" colSpan={3} Cell={CoverageCell} />,
            ]}
            expandedContentKey="methods"
          >
            <Column
              name="name"
              label="Name"
              Cell={(props) => <NameCell pathKey="path" icon={<Icons.Class />} {...props} />}
            />
            <Column
              name="coverage"
              label="Coverage"
              Cell={({ value }) => <span>{`${percentFormatter(value)}%`}</span>}
            />
            <Column name="totalMethodsCount" label="Methods total" />
            <Column name="coveredMethodsCount" label="Methods covered" />
          </ExpandableTable>
        </>
      )}
    </div>
  );
});

const Header = coverageDetails.header(Panel);
const Title = coverageDetails.title(Panel);

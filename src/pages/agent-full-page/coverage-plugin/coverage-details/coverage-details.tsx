import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { useWsConnection } from '../../../../hooks';
import { defaultPluginSocket } from '../../../../common/connection';
import { ExpandableTable, Column, Icons } from '../../../../components';
import { Panel } from '../../../../layouts';
import { ClassCoverage } from '../../../../types/class-coverage';
import { CompoundCell } from './compound-cell';
import { CoverageCell } from './coverage-cell';
import { NameCell } from './name-cell';

import styles from './coverage-details.module.scss';

interface Props {
  className?: string;
}

const coverageDetails = BEM(styles);

export const CoverageDetails = coverageDetails(({ className }: Props) => {
  const coverageByPackages =
    useWsConnection<ClassCoverage[]>(defaultPluginSocket, '/coverage-by-packages', {
      agentId: 'MySuperAgent',
    }) || [];

  return (
    <div className={className}>
      <Header align="space-between">Details</Header>

      {coverageByPackages.length > 0 && (
        <>
          <Title>
            <span>Packages</span>
            <h2>{coverageByPackages.length}</h2>
          </Title>
          <ExpandableTable
            data={coverageByPackages}
            idKey="name"
            columnsSize="medium"
            expandedColumns={[
              <Column
                name="name"
                Cell={(props) => <CompoundCell pathKey="path" icon={<Icons.Class />} {...props} />}
              />,
              <Column name="coverage" Cell={CoverageCell} />,
              <Column name="totalMethodsCount" />,
              <Column name="coveredMethodsCount" />,
            ]}
            expandedContentKey="classes"
          >
            <Column
              name="name"
              label="Name"
              Cell={({ value }) => <NameCell icon={<Icons.Package />} value={value} />}
            />
            <Column name="coverage" label="Coverage" Cell={CoverageCell} />
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

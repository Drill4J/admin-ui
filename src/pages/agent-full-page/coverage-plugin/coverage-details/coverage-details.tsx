import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { useWsConnection } from '../../../../hooks';
import { defaultPluginSocket } from '../../../../common/connection';
import { ExpandableTable, Column } from '../../../../components';
import { Panel } from '../../../../layouts';
import { ClassCoverage } from '../../../../types/class-coverage';
import { NameCell } from './name-cell';
import { CoverageCell } from './coverage-cell';

import styles from './coverage-details.module.scss';

interface Props {
  className?: string;
}

const stub = [
  {
    methods: [
      { name: 'welcome', desc: '()Ljava/lang/String;', coverage: 100 },
      { name: '<init>', desc: '()V', coverage: 0 },
    ],
    name: 'WelcomeController1',
    path: 'org/drilspringframework/samples/petclinic/system/WelcomeController',
    totalMethodsCount: 2,
    coverage: 100,
    coveredMethodsCount: 2,
  },
  {
    methods: [
      { name: 'welcome', desc: '()Ljava/lang/String;', coverage: 100 },
      { name: '<init>', desc: '()V', coverage: 50 },
    ],
    name: 'WelcomeController2',
    path: 'org/drilspringframework/samples/petclinic/system/WelcomeController',
    totalMethodsCount: 2,
    coverage: 100,
    coveredMethodsCount: 2,
  },
  {
    methods: [
      { name: 'welcome', desc: '()Ljava/lang/String;', coverage: 100 },
      { name: '<init>', desc: '()V', coverage: 0 },
    ],
    name: 'WelcomeController3',
    path: 'org/drilspringframework/samples/petclinic/system/WelcomeController',
    totalMethodsCount: 2,
    coveredMethodsCount: 2,
    coverage: 100,
  },
];

const coverageDetails = BEM(styles);

export const CoverageDetails = coverageDetails(({ className }: Props) => {
  const coverageByClasses =
    useWsConnection<ClassCoverage[]>(defaultPluginSocket, '/coverage-by-classes') || [];

  return (
    <div className={className}>
      <Header align="space-between">Details</Header>
      {coverageByClasses.length > 0 && (
        <ExpandableTable
          data={coverageByClasses}
          onExpand={() => {}}
          idKey="name"
          columnsSize="medium"
          expandedColumns={[
            <Column
              name="name"
              colSpan={2}
              Cell={(props) => <NameCell pathKey="desc" {...props} />}
            />,
            <Column name="coverage" colSpan={3} Cell={CoverageCell} />,
          ]}
          expandedContentKey="methods"
        >
          <Column
            name="name"
            label="Name"
            Cell={(props) => <NameCell pathKey="path" {...props} />}
          />
          <Column name="coverage" label="Coverage" />
          <Column name="totalMethodsCount" label="Methods total" />
          <Column name="coveredMethodsCount" label="Methods covered" />
        </ExpandableTable>
      )}
    </div>
  );
});

const Header = coverageDetails.header(Panel);

import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { useWsConnection } from '../../../../hooks';
import { defaultPluginSocket } from '../../../../common/connection';
import { ExpandableTable, Column, Icons } from '../../../../components';
import { Panel } from '../../../../layouts';
import { ClassCoverage } from '../../../../types/class-coverage';
import { CompoundCell } from './compound-cell';
import { CoverageCell } from './coverage-cell';
import { NameCell } from './name-cell';
import { AssociatedTestModal } from './associated-test-modal';
import { AssociatedTestColumn } from './associated-test-column';

import styles from './coverage-details.module.scss';

interface Props extends RouteComponentProps<{ agentId: string }> {
  className?: string;
}

const coverageDetails = BEM(styles);

export const CoverageDetails = withRouter(
  coverageDetails(({ className, match: { params: { agentId } } }: Props) => {
    const coverageByPackages =
      useWsConnection<ClassCoverage[]>(defaultPluginSocket, '/coverage-by-packages', {
        agentId,
      }) || [];
    const [selectedId, setSelectedId] = React.useState('');

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
                  Cell={(props) => (
                    <CompoundCell type="primary" pathKey="path" icon={<Icons.Class />} {...props} />
                  )}
                />,
                <Column name="coverage" Cell={CoverageCell} />,
                <Column name="totalMethodsCount" />,
                <Column name="coveredMethodsCount" />,
                <Column
                  name="assocTestsCount"
                  label="Associated tests"
                  Cell={({ value, item: { id } }) => (
                    <span onClick={() => setSelectedId(id)}>{value ? value : 'n/a'}</span>
                  )}
                />,
              ]}
              secondLevelExpand={[
                <Column
                  name="name"
                  Cell={(props) => (
                    <CompoundCell
                      type="secondary"
                      pathKey="desc"
                      icon={<Icons.Function />}
                      {...props}
                    />
                  )}
                  colSpan={2}
                />,
                <Column name="coverage" Cell={CoverageCell} colSpan={3} />,
                <Column
                  name="assocTestsCount"
                  label="Associated tests"
                  Cell={AssociatedTestColumn}
                />,
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
              <Column name="assocTestsCount" label="Associated tests" Cell={AssociatedTestColumn} />
            </ExpandableTable>
          </>
        )}
        {selectedId && (
          <AssociatedTestModal
            id={selectedId}
            isOpen={Boolean(selectedId)}
            onToggle={() => setSelectedId('')}
          />
        )}
      </div>
    );
  }),
);

const Header = coverageDetails.header(Panel);
const Title = coverageDetails.title(Panel);

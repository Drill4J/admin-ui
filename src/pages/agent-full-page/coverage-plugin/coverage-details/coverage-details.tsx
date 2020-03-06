import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import {
  ExpandableTable, Column, Icons, SortArrows,
} from 'components';
import { Panel } from 'layouts';
import { ClassCoverage } from 'types/class-coverage';
import { CompoundCell } from './compound-cell';
import { CoverageCell } from './coverage-cell';
import { NameCell } from './name-cell';
import { AssociatedTestModal } from './associated-test-modal';
import { AssociatedTestColumn } from './associated-test-column';

import styles from './coverage-details.module.scss';

interface Props {
  className?: string;
  coverageByPackages: ClassCoverage[];
  header?: React.ReactNode;
  associatedTestsTopic: string;
}

const coverageDetails = BEM(styles);

export const CoverageDetails = coverageDetails(
  ({
    className, coverageByPackages, header, associatedTestsTopic,
  }: Props) => {
    const [selectedId, setSelectedId] = React.useState('');
    return (
      <div className={className}>
        {coverageByPackages.length > 0 && (
          <>
            <Title>{header}</Title>
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
                  Cell={(props) => <AssociatedTestColumn onClick={setSelectedId} {...props} />}
                />,
              ]}
              secondLevelExpand={[
                <Column
                  name="name"
                  Cell={(props) => (
                    <CompoundCell
                      type="secondary"
                      pathKey="decl"
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
                  Cell={(props) => <AssociatedTestColumn onClick={setSelectedId} {...props} />}
                />,
              ]}
              expandedContentKey="classes"
              hasSecondLevelExpand
            >
              <Column
                name="name"
                label="Name"
                Cell={({ value }) => <NameCell icon={<Icons.Package />} value={value} />}
              />
              <Column name="coverage" label="Coverage" Cell={CoverageCell} />
              <Column name="totalMethodsCount" label="Methods total" />
              <Column name="coveredMethodsCount" label="Methods covered" />
              <Column
                name="assocTestsCount"
                label="Associated tests"
                Cell={(props) => <AssociatedTestColumn onClick={setSelectedId} {...props} />}
              />
            </ExpandableTable>
          </>
        )}
        {selectedId && (
          <AssociatedTestModal
            id={selectedId}
            isOpen={Boolean(selectedId)}
            onToggle={() => setSelectedId('')}
            associatedTestsTopic={associatedTestsTopic}
          />
        )}
      </div>
    );
  },
);

const Title = coverageDetails.title(Panel);

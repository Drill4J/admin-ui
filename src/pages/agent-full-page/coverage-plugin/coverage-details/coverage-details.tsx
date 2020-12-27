import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Icons, Panel } from '@drill4j/ui-kit';

import { ClassCoverage } from 'types/class-coverage';
import { FilterList } from 'types/filter-list';
import { useVisibleElementsCount, useBuildVersion } from 'hooks';
import { Cells, SearchPanel } from 'components';
import {
  useTableActionsState, useTableActionsDispatch, setSearch,
} from 'modules';
import { NameCell } from './name-cell';
import { AssociatedTestModal } from './associated-test-modal';
import { ExpandableTable, Column } from './table';
import { CoverageCell } from './coverage-cell';
import { CellProps } from './table/table-types';

import styles from './coverage-details.module.scss';

interface Props {
  className?: string;
  topic: string;
  associatedTestsTopic: string;
  classesTopicPrefix: string;
}

const coverageDetails = BEM(styles);

export const CoverageDetails = coverageDetails(
  ({
    className, associatedTestsTopic, classesTopicPrefix, topic,
  }: Props) => {
    const [selectedId, setSelectedId] = React.useState('');
    const dispatch = useTableActionsDispatch();
    const { search, sort } = useTableActionsState();
    const {
      items: coverageByPackages = [],
      totalCount = 0,
      filteredCount = 0,
    } = useBuildVersion<FilterList<ClassCoverage>>(topic, search, sort, 'LIST') || {};
    const ref = React.useRef<HTMLDivElement>(null);
    const visibleElementsCount = useVisibleElementsCount(ref, 10, 10);
    const [searchQuery] = search;
    const expandedColumns = [
      <Column name="coverage" Cell={CoverageCell} />,
      <Column name="totalMethodsCount" testContext="total-methods-count" />,
      <Column name="coveredMethodsCount" testContext="covered-methods-count" />,
      <Column
        name="assocTestsCount"
        label="Associated tests"
        Cell={({ value = '', item: { id = '' } = {} }: CellProps<string, { id?: string }>) => (
          <Cells.Clickable
            onClick={() => {
              setSelectedId(id);
            }}
            data-test="coverage-details:associated-tests-count"
            disabled={!value}
          >
            {value || 'n/a'}
          </Cells.Clickable>
        )}
      />,
    ];

    return (
      <div className={className}>
        <>
          <CoverageDetailsSearchPanel
            onSearch={(searchValue) => dispatch(setSearch([{ value: searchValue, field: 'name', op: 'CONTAINS' }]))}
            searchQuery={searchQuery?.value}
            searchResult={filteredCount}
            placeholder="Search by packages"
          >
            Displaying {coverageByPackages.slice(0, visibleElementsCount).length} of {totalCount} packages
          </CoverageDetailsSearchPanel>
          <ExpandableTable
            data={coverageByPackages.slice(0, visibleElementsCount)}
            idKey="name"
            classesTopicPrefix={classesTopicPrefix}
            tableContentStub={coverageByPackages.length === 0 && (
              <NotFound>
                <Icons.Package height={104} width={107} />
                <Title>No results found</Title>
                <Message>Try adjusting your search or filter to find what you are  looking for.</Message>
              </NotFound>
            )}
            expandedColumns={[
              <Column
                name="name"
                Cell={(({ item: { name = '' } = {} }: CellProps<unknown, { name?: string }>) => (
                  <NameCell type="primary" icon={<Icons.Class width={16} height={16} />} value={name} testContext="class" />
                ))}
                align="start"
              />,
              ...expandedColumns,
            ]}
            secondLevelExpand={[
              <Column
                name="name"
                Cell={({ item: { name = '', decl = '' } = {} }: CellProps<unknown, { name?: string, decl?: string }>) => (
                  <Cells.Compound key={name} cellName={name} cellAdditionalInfo={decl} icon={<Icons.Function />} />
                )}
                align="start"
              />,
              ...expandedColumns,
            ]}
            expandedContentKey="name"
            hasSecondLevelExpand
          >
            <Column
              name="name"
              label="Name"
              Cell={({ value = '' }: CellProps<string, unknown>) => (
                <NameCell
                  icon={<Icons.Package />}
                  value={value}
                  testContext="package"
                />
              )}
              align="start"
            />
            <Column
              name="coverage"
              label={(
                <Panel align="end">
                  Coverage, %<CoverageIcon width={16} height={16} />
                </Panel>
              )}
              Cell={CoverageCell}
            />
            <Column name="totalMethodsCount" label="Methods total" testContext="total-methods-count" />
            <Column name="coveredMethodsCount" label="Methods covered" testContext="covered-methods-count" />
            <Column
              name="assocTestsCount"
              label="Associated tests"
              Cell={({ value = '', item: { id = '' } = {} }: CellProps<string, { id?: string; }>) => (
                <Cells.Clickable
                  onClick={() => {
                    setSelectedId(id);
                  }}
                  data-test="coverage-details:associated-tests-count"
                  disabled={!value}
                >
                  {value || 'n/a'}
                </Cells.Clickable>
              )}
            />
          </ExpandableTable>
          <div ref={ref} />
        </>
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

const CoverageDetailsSearchPanel = coverageDetails.coverageDetailsSearchPanel(SearchPanel);
const NotFound = coverageDetails.notFound('div');
const Title = coverageDetails.title('div');
const Message = coverageDetails.message('div');
const CoverageIcon = coverageDetails.coverageIcon(Icons.Checkbox);

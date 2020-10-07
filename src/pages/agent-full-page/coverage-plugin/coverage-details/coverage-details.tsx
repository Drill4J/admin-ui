import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Icons, Panel } from '@drill4j/ui-kit';
import { Form, Field } from 'react-final-form';

import { Fields } from 'forms';

import { ClassCoverage } from 'types/class-coverage';
import { useVisibleElementsCount } from 'hooks';
import { useTableActionsState, useTableActionsDispatch, setSearch } from 'modules';
import { CompoundCell } from '../compound-cell';
import { CoverageCell } from './coverage-cell';
import { NameCell } from './name-cell';
import { AssociatedTestModal } from './associated-test-modal';
import { AssociatedTestColumn } from './associated-test-column';
import { ExpandableTable, Column } from './table';
import { useBuildVersion } from '../use-build-version';

import styles from './coverage-details.module.scss';

interface Props {
  className?: string;
  topic: string;
  associatedTestsTopic: string;
  classesTopicPrefix: string;
  packageCount?: number;
}

const coverageDetails = BEM(styles);

export const CoverageDetails = coverageDetails(
  ({
    className, associatedTestsTopic, classesTopicPrefix, topic, packageCount,
  }: Props) => {
    const [selectedId, setSelectedId] = React.useState('');
    const dispatch = useTableActionsDispatch();
    const { search, sort } = useTableActionsState();
    const coverageByPackages = useBuildVersion<ClassCoverage[]>(topic, search, sort) || [];
    const ref = React.useRef<HTMLDivElement>(null);
    const visibleElementsCount = useVisibleElementsCount(ref, 10, 10);

    return (
      <div className={className}>
        <>
          <Panel>
            <Form
              onSubmit={(values) => dispatch(setSearch(values?.search || ''))}
              render={({ handleSubmit, form }) => (
                <form onSubmit={handleSubmit}>
                  <Field
                    name="search"
                    component={SearchField}
                    placeholder="Search by packages"
                    reset={() => { form.reset(); handleSubmit(); }}
                  />
                </form>
              )}
            />
            <SearchResult align={search.value ? 'space-between' : 'end'}>
              {search.value && <span data-test="coverage-details:search-result">{coverageByPackages.length} result</span>}
              <span data-test="coverage-details:displaying-packages-count">
                Displaying {coverageByPackages.slice(0, visibleElementsCount).length} of {packageCount} packages
              </span>
            </SearchResult>
          </Panel>
          <ExpandableTable
            data={coverageByPackages.slice(0, visibleElementsCount)}
            idKey="name"
            columnsSize="medium"
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
                Cell={(props) => (
                  <CompoundCell type="primary" nameKey="name" pathKey="path" icon={<Icons.Class />} {...props} />
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
                    nameKey="name"
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
            expandedContentKey="name"
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

const NotFound = coverageDetails.notFound('div');
const Title = coverageDetails.title('div');
const Message = coverageDetails.message('div');
const SearchField = coverageDetails.searchField(Fields.Search);
const SearchResult = coverageDetails.searchResult(Panel);

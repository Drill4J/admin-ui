import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Icons, Panel } from '@drill4j/ui-kit';
import { Form, Field } from 'react-final-form';

import { Fields } from 'forms';

import { ClassCoverage } from 'types/class-coverage';
import { useVisibleElementsCount } from 'hooks';
import { Cells } from 'components';
import { useTableActionsState, useTableActionsDispatch, setSearch } from 'modules';
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
                Cell={({ item: { name, path } }) => (
                  <Cells.Compound key={name} type="primary" cellName={name} cellAdditionalInfo={path} icon={<Icons.Class />} />
                )}
              />,
              <Column name="coverage" Cell={CoverageCell} />,
              <Column name="totalMethodsCount" align="right" />,
              <Column name="coveredMethodsCount" align="right" />,
              <Column
                name="assocTestsCount"
                label="Associated tests"
                Cell={(props) => <AssociatedTestColumn onClick={setSelectedId} {...props} />}
                align="right"
              />,
            ]}
            secondLevelExpand={[
              <Column
                name="name"
                Cell={({ item: { name, decl } }) => (
                  <Cells.Compound key={name} type="secondary" cellName={name} cellAdditionalInfo={decl} icon={<Icons.Function />} />
                )}
                colSpan={2}
              />,
              <Column name="coverage" Cell={CoverageCell} colSpan={3} />,
              <Column
                name="assocTestsCount"
                label="Associated tests"
                Cell={(props) => <AssociatedTestColumn onClick={setSelectedId} {...props} />}
                align="right"
              />,
            ]}
            expandedContentKey="name"
            hasSecondLevelExpand
          >
            <Column
              name="name"
              label="Name"
              Cell={({ value }) => <NameCell icon={<Icons.Package />} value={value} />}
              width="40%"
            />
            <Column name="coverage" label="Coverage" Cell={CoverageCell} />
            <Column name="totalMethodsCount" label="Methods total" align="right" />
            <Column name="coveredMethodsCount" label="Methods covered" align="right" />
            <Column
              name="assocTestsCount"
              label="Associated tests"
              Cell={(props) => <AssociatedTestColumn onClick={setSelectedId} {...props} />}
              align="right"
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

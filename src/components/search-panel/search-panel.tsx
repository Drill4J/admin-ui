import { BEM } from '@redneckz/react-bem-helper';
import { Panel } from '@drill4j/ui-kit';
import { Form, Field } from 'react-final-form';

import { Fields } from 'forms';

import styles from './search-panel.module.scss';

interface Props {
  className?: string;
  onSearch: (search: string) => void;
  searchQuery: string;
  searchResult: number;
  children: React.ReactNode;
  placeholder: string;
}

const searchPanel = BEM(styles);

export const SearchPanel = searchPanel(({
  className, onSearch, searchQuery, searchResult, children, placeholder,
}: Props) => (
  <div className={className}>
    <Panel>
      <Form
        onSubmit={({ search = '' }) => onSearch(search)}
        render={({ handleSubmit, form }) => (
          <SearchField>
            <form onSubmit={handleSubmit}>
              <Field
                name="search"
                component={Fields.Search}
                placeholder={placeholder}
                reset={() => { form.reset(); handleSubmit(); }}
              />
            </form>
          </SearchField>
        )}
      />
      <SearchResult align={searchQuery ? 'space-between' : 'end'}>
        {searchQuery && <span data-test="search-panel:search-result">{searchResult} result{searchResult > 1 ? 's' : ''}</span>}
        <span data-test="search-panel:displaying-results-count">
          {children}
        </span>
      </SearchResult>
    </Panel>
  </div>
));

const SearchField = searchPanel.searchField('div');
const SearchResult = searchPanel.searchResult(Panel);

/*
 * Copyright 2020 EPAM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { BEM } from '@redneckz/react-bem-helper';
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
    <div className="d-flex align-items-center w-100">
      <Form
        onSubmit={({ search = '' }) => onSearch(search)}
        render={({ handleSubmit, form }) => (
          <div className="py-2 h-40px">
            <form onSubmit={handleSubmit}>
              <Field
                name="search"
                component={Fields.Search}
                placeholder={placeholder}
                reset={() => { form.reset(); handleSubmit(); }}
              />
            </form>
          </div>
        )}
      />
      <SearchResult
        className={`d-flex align-items-center w-100 ml-4 ${searchQuery ? 'justify-content-between' : 'justify-content-end'}`}
      >
        {searchQuery && <span data-test="search-panel:search-result">{searchResult} result{searchResult > 1 ? 's' : ''}</span>}
        <span data-test="search-panel:displaying-results-count">
          {children}
        </span>
      </SearchResult>
    </div>
  </div>
));

const SearchResult = searchPanel.searchResult('div');

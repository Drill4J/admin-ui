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
import { Form, Field } from 'react-final-form';

import { Fields } from 'forms';

interface Props {
  onSearch: (search: string) => void;
  searchQuery: string;
  searchResult: number;
  children: React.ReactNode;
  placeholder: string;
}

export const SearchPanel = ({
  onSearch, searchQuery, searchResult, children, placeholder,
}: Props) => (
  <div>
    <div className="flex items-center w-full">
      <Form
        onSubmit={({ search = '' }) => onSearch(search)}
        render={({ handleSubmit, form }) => (
          <div className="py-2 h-10">
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
      <div
        className={`flex items-center w-full ml-4 ${searchQuery
          ? 'justify-between'
          : 'justify-end'} text-12 lh-20 monochrome-default`}
      >
        {searchQuery && <span data-test="search-panel:search-result">{searchResult} result{searchResult > 1 ? 's' : ''}</span>}
        <span data-test="search-panel:displaying-results-count">
          {children}
        </span>
      </div>
    </div>
  </div>
);

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
import { Inputs } from '@drill4j/ui-kit';
import { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { styled } from 'twin.macro';

import { convertToSingleSpaces } from 'utils';

interface Props {
  onSearch: (search: string) => void;
  searchQuery: string;
  searchResult: number;
  placeholder: string;
}

export const SearchPanel = ({
  onSearch,
  searchQuery,
  searchResult,
  placeholder,
}: Props) => {
  const [searchValue, setValue] = useState('');
  const search = useCallback(
    debounce((v) => {
      onSearch(v.trimEnd());
    }, 500),
    [onSearch],
  );

  useEffect(() => {
    search(searchValue);
  }, [searchValue]);

  return (
    <div>
      <div className="flex items-baseline w-full">
        <div className="py-2 h-10">
          <Search
            value={searchValue}
            onChange={({ target: { value = '' } }) => setValue(convertToSingleSpaces(value))}
            placeholder={placeholder}
            reset={() => setValue('')}
          />
        </div>
        <div
          className={`flex items-center w-full ml-4 ${
            searchQuery ? 'justify-between' : 'justify-end'
          } text-12 leading-20 monochrome-default`}
        >
          {searchQuery && (
            <span data-test="search-panel:search-result">
              {searchResult} result{searchResult > 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const Search = styled(Inputs.Search)`
  * > input {
    width: 400px;
  }

  svg[width='8'] {
    left: calc(100% - 10px);
  }
`;

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
import {
  Badge, Icons, Inputs,
} from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

import { Plugin as PluginType } from 'types/plugin';

interface Props {
  plugins: PluginType[];
  footer?: React.ReactNode;
  selectedRows: string[];
  onSelect: (selectedItems: string[]) => void;
}

const Element = styled.div`
  ${({ selected }: { selected: boolean }) => selected && tw`bg-blue-ultralight-tint`}
`;

const PluginsIcon = styled.div`
  ${tw`flex items-center justify-center h-12 min-w-48px rounded-lg bg-monochrome-light-tint text-monochrome-default`}
  ${({ selected }: { selected: boolean }) => selected && tw`bg-blue-default text-monochrome-white`}
`;

export const SelectableList = ({ plugins, onSelect, selectedRows }: Props) => (
  <div tw="hover:bg-monochrome-light-tint">
    {plugins.map(({
      id = '', available, description, version, name,
    }) => (
      <Element key={id} selected={selectedRows.includes(id)}>
        <div tw="flex items-center gap-x-4 p-4 w-full border-b border-monochrome-medium-tint">
          {available && (
            <Inputs.Checkbox
              onChange={() => {
                selectedRows.includes(id)
                  ? onSelect(selectedRows.filter((selectedItem) => selectedItem !== id))
                  : onSelect([...selectedRows, id]);
              }}
              checked={selectedRows.includes(id)}
            />
          )}
          <PluginsIcon selected={selectedRows.includes(id)}>
            <Icons.Test2Code />
          </PluginsIcon>
          <div tw="flex flex-col items-start">
            <div tw="flex items-center w-full gap-x-2">
              <div tw="text-14 font-bold text-monochrome-black">{name}</div>
              {!available && <Badge tw="h-5 text-12 font-bold" color="gray">Installed</Badge>}
              {version && <div tw="flex-grow font-regular text-12 text-right text-monochrome-black">{version}</div>}
            </div>
            <span tw="h-8 mt-1 overflow-hidden font-regular text-12 tracking-normal leading-16 text-monochrome-default" title={description}>
              {description}
            </span>
          </div>
        </div>
      </Element>
    ))}
  </div>
);

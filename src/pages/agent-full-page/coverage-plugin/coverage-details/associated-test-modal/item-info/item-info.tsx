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
import tw, { styled } from 'twin.macro';

interface Props {
  children?: React.ReactNode;
  packageName?: string;
  testClassName?: string;
  methodName?: string;
  treeLevel: number;
}

const ItemWrapper = styled.div`
  ${tw`flex flex-row items-center h-8`}
`;
const Label = styled.span`
  ${tw`min-w-56px font-bold text-14 leading-32 text-monochrome-black text-left`}
`;
const Value = styled.div`
  ${tw`ml-4 text-14 leading-32 text-monochrome-default`}
`;

export const ItemInfo = ({
  packageName, testClassName, methodName, treeLevel,
}: Props) => (
  <div tw="bg-monochrome-light-tint border-t border-b border-monochrome-medium-tint">
    <div tw="flex flex-col justify-center min-h-64px py-2 px-6">
      {packageName ? (
        <div tw="flex flex-row items-center h-8">
          <Label>Package</Label>
          <Value className="text-ellipsis" title={packageName}>{packageName}</Value>
        </div>
      ) : (
        <div tw="space-y-4 pt-2 pb-2 animate-pulse">
          {Array.from(Array(treeLevel).keys()).map((level) => (<div key={level} tw="h-4 bg-monochrome-medium-tint rounded" />))}
        </div>
      )}
      {testClassName && (
        <ItemWrapper>
          <Label>Class</Label>
          <Value className="text-ellipsis" title={testClassName}>{testClassName}</Value>
        </ItemWrapper>
      )}
      {methodName && (
        <ItemWrapper>
          <Label>Method</Label>
          <Value className="text-ellipsis" title={methodName}>{methodName}</Value>
        </ItemWrapper>
      )}
    </div>
  </div>
);

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
import { useParams, useHistory } from 'react-router-dom';
import { Icons } from '@drill4j/ui-kit';
import 'twin.macro';

import { ServiceGroupSummary } from 'types/service-group-summary';
import { ReactComponent as LogoSvg } from './service-group-logo.svg';

interface Props {
  serviceGroup?: ServiceGroupSummary;
}

export const ServiceGroupHeader = ({ serviceGroup: { name, summaries = [] } = {} }: Props) => {
  const { id = '' } = useParams<{ id: string }>();
  const { push } = useHistory();

  return (
    <div tw="flex items-center w-full h-28">
      <LogoSvg tw="ml-6" />
      <div tw="flex items-center justify-between w-full h-full mx-6">
        <div tw="flex flex-col gap-y-1">
          <div tw="text-32 leading-40">{name}</div>
          <div tw="text-14 leading-20">
            Agents&nbsp;<span tw="text-monochrome-default">{summaries.length}</span>
          </div>
        </div>
        <div className="link">
          <Icons.Settings
            width={32}
            height={32}
            onClick={() => push(`/agents/service-group/${id}/settings/general`)}
            data-test="service-group-header:settings-button"
          />
        </div>
      </div>
    </div>
  );
};

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
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Icons, Inputs, Modal } from '@drill4j/ui-kit';
import tw from 'twin.macro';

import { copyToClipboard } from 'utils';
import { usePluginData } from 'pages/service-group-full-page/use-plugin-data';
import { useCloseModal } from 'hooks';
import { TestsToRunUrl } from '../tests-to-run-url';
import { getTestsToRunURL } from '../get-tests-to-run-url';

interface GroupedTestToRun {
  byType?: Record<string, string[]>;
  totalCount?: number;
}

export const TestsToRunModal = () => {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setCopied(false), 5000);
    copied && timeout;
    return () => clearTimeout(timeout);
  }, [copied]);

  const { serviceGroupId = '', pluginId = '' } =
    useParams<{ serviceGroupId: string; pluginId: string }>();
  const { byType: testsToRun = {} } =
    usePluginData<GroupedTestToRun>('/group/data/tests-to-run', serviceGroupId, pluginId) || {};
  const allTests = Object.values(testsToRun).reduce((acc, tests) => [...acc, ...tests], []);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const getSelectedTests = () => {
    switch (selectedFilter) {
      case 'manual':
        return testsToRun.MANUAL;
      case 'auto':
        return testsToRun.AUTO;
      default:
        return allTests;
    }
  };
  const closeModal = useCloseModal('/tests-to-run-modal');

  return (
    <Modal isOpen onToggle={closeModal}>
      <div tw="flex flex-col h-full">
        <div tw="flex items-center gap-x-2 h-16 border-b border-monochrome-medium-tint pl-6 text-18 leading-24 text-monochrome-black">
          <Icons.Test height={20} width={18} viewBox="0 0 18 20" />
          <span>Tests to run</span>
          <h2>{allTests.length}</h2>
        </div>
        <div
          css={[
            tw`relative flex flex-col gap-y-4 gap-x-2 pt-2 pb-2 pr-6 pl-6`,
            tw`text-14 leading-20 bg-monochrome-light-tint break-words text-monochrome-default`,
          ]}
        >
          <span>
            These are recommendations for this build updates only. Use this Curl in your command
            line to get JSON:
          </span>
          <TestsToRunUrl agentId={serviceGroupId} pluginId={pluginId} agentType="ServiceGroup" />
          <div tw="absolute top-16 right-6 text-blue-default cursor-pointer active:text-blue-shade">
            {copied ? (
              <div className="flex items-center gap-x-1 text-10 leading-16 primary-blue-default">
                <span className="monochrome-black">Copied to clipboard.</span>
                <Icons.Check height={10} width={14} viewBox="0 0 14 10" />
              </div>
            ) : (
              <Icons.Copy
                data-test="quality-gate-status:copy-icon"
                onClick={() => {
                  copyToClipboard(getTestsToRunURL(serviceGroupId, pluginId, 'ServiceGroup'));
                  setCopied(true);
                }}
              />
            )}
          </div>
        </div>
        <div tw="h-full w-full overflow-y-auto overflow-x-hidden">
          <Inputs.Dropdown
            tw="mt-3 ml-6 text-blue-default"
            items={[
              { value: 'all', label: 'All test types' },
              { value: 'manual', label: `Manual tests (${(testsToRun.MANUAL || []).length})` },
              {
                value: 'auto',
                label: `Auto tests (${(testsToRun.AUTO || []).length})`,
              },
            ]}
            onChange={({ value }) => setSelectedFilter(value)}
            value={selectedFilter}
          />
          <div tw="text-14 mt-4 px-6 space-y-4">
            {(getSelectedTests() || []).map((test) => (
              <div tw="flex items-center gap-x-4" key={nanoid()}>
                <Icons.Test tw="flex items-center min-w-16px" />
                <div tw="break-all">{test}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

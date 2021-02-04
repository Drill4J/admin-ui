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
import { useEffect, useState } from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { useParams } from 'react-router-dom';
import { Button, Icons, Popup } from '@drill4j/ui-kit';

import { copyToClipboard } from 'utils';
import { clearTimeout, setTimeout } from 'timers';
import { TestsToRunUrl } from '../../../tests-to-run-url';
import { getTestsToRunURL } from '../../../get-tests-to-run-url';

import styles from './get-suggested-tests-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  agentType: string;
}

const getSuggestedTestsModal = BEM(styles);

export const GetSuggestedTestsModal = getSuggestedTestsModal(({
  className, isOpen, onToggle, agentType,
}: Props) => {
  const { agentId = '', pluginId = '' } = useParams<{ agentId: string; pluginId: string; }>();
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => setCopied(false), 5000);
    copied && timeout;
    return () => clearTimeout(timeout);
  }, [copied]);

  return (
    <Popup
      isOpen={isOpen}
      onToggle={onToggle}
      header="Get Suggested Tests"
      closeOnFadeClick
    >
      <div className={`${className} flex flex-column pt-4 px-6 pb-6 gy-7`}>
        <Message className="flex flex-column gy-4 fs-14 lh-20" data-test="get-suggested-tests-modal:message">
          <span>
            These are recommendations for this build updates only.<br />
            Use this Curl in your command line to get JSON:
          </span>
          <TestsToRunUrl agentId={agentId} pluginId={pluginId} agentType={agentType} />
        </Message>
        <div className="flex justify-end gx-4">
          <CopyToClipboardButton
            type="primary"
            size="large"
            onClick={() => {
              copyToClipboard(getTestsToRunURL(agentId, pluginId, agentType));
              setCopied(true);
            }}
            data-test="get-suggested-tests-modal:copy-to-clipboard-button"
          >
            {copied
              ? (
                <div className="flex justify-center items-center gx-2 w-full">
                  <Icons.Check height={10} width={14} viewBox="0 0 14 10" />
                  Copied
                </div>
              )
              : 'Copy to Clipboard'}
          </CopyToClipboardButton>
          <Button
            type="secondary"
            size="large"
            onClick={() => onToggle(false)}
            data-test="get-suggested-tests-modal:close-button"
          >
            Close
          </Button>
        </div>
      </div>
    </Popup>
  );
});

const Message = getSuggestedTestsModal.message('div');
const CopyToClipboardButton = getSuggestedTestsModal.copyToClipboardButton(Button);

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
import { useParams } from 'react-router-dom';
import {
  Button, Popup, Panel, Icons,
} from '@drill4j/ui-kit';

import { copyToClipboard } from 'utils';
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
  return (
    <Popup
      isOpen={isOpen}
      onToggle={onToggle}
      header="Get Suggested Tests"
      closeOnFadeClick
    >
      <div className={className}>
        <Message data-test="get-suggested-tests-modal:message">
          <span>These are recommendations for this build updates only.</span>
          <span>Use this Curl in your command line to get JSON:</span>
          <CommandWrapper verticalAlign="end">
            <TestsToRunUrl agentId={agentId} pluginId={pluginId} agentType={agentType} />
            <CopyIcon onClick={() => copyToClipboard(getTestsToRunURL(agentId, pluginId, agentType))} />
          </CommandWrapper>
        </Message>
        <CloseButton
          type="secondary"
          size="large"
          onClick={() => onToggle(false)}
          data-test="get-suggested-tests-modal:close-button"
        >
          Close
        </CloseButton>
      </div>
    </Popup>
  );
});

const Message = getSuggestedTestsModal.message('div');
const CommandWrapper = getSuggestedTestsModal.commandWrapper(Panel);
const CopyIcon = getSuggestedTestsModal.copyIcon(Icons.Copy);
const CloseButton = getSuggestedTestsModal.closeButton(Button);

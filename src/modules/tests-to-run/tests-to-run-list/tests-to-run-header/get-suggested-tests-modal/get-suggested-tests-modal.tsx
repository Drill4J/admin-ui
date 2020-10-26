import * as React from 'react';
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

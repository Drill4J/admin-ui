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
import { useContext, useState } from 'react';
import {
  Button, Popup, Checkbox, Spinner,
} from '@drill4j/ui-kit';
import { useParams } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import { useAgent, useBuildVersion, useCloseModal } from 'hooks';
import { NotificationManagerContext } from 'notification-manager';
import { Baseline } from 'types/baseline';
import { toggleBaseline } from '../../api';

const Message = styled.div`
  ${tw`text-14 leading-20`}
`;

const ActionButton = styled(Button)(({ isBaseline }: {isBaseline: boolean}) => [
  tw`place-content-center`,
  isBaseline && tw`w-40`,
  !isBaseline && tw`w-34`,
]);

export const BaselineBuildModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { pluginId = '', agentId = '', buildVersion = '' } = useParams<{ pluginId: string; agentId: string; buildVersion: string; }>();
  const { buildVersion: activeBuildVersion = '' } = useAgent(agentId) || {};
  const { version: baseline } = useBuildVersion<Baseline>('/data/baseline', undefined, undefined, undefined, activeBuildVersion) || {};
  const isBaseline = baseline === buildVersion;
  const [isConfirmed, setIsConfirmed] = useState(isBaseline);
  const closeModal = useCloseModal('/baseline-build-modal');
  const { showMessage } = useContext(NotificationManagerContext);

  return (
    <Popup
      isOpen
      onToggle={closeModal}
      header={`${isBaseline ? 'Unset' : 'Set'} as Baseline Build`}
      closeOnFadeClick
    >
      <div tw="w-108">
        <div className="flex flex-col gap-6 pt-4 px-6 pb-6">
          <Message className="flex items-center w-full">
            {isBaseline
              ? (
                <>
                  By confirming this action, you will unset this build as baseline. All<br />
                  subsequent builds won’t be compared to it.
                </>
              )
              : (
                <>
                  You will set the current build as baseline. All subsequent builds will be compared to it.
                </>
              )}
          </Message>
          {!isBaseline && (
            <Message className="flex items-start gap-2 w-full">
              <Checkbox checked={isConfirmed} onChange={() => setIsConfirmed(!isConfirmed)} />
              <span>
                I understand that it’s necessary to run all tests <br /> to determine the number of suggested tests.
              </span>
            </Message>
          )}
          <div className="flex gap-x-4">
            <ActionButton
              primary
              size="large"
              isBaseline={isBaseline}
              onClick={async () => {
                try {
                  setIsLoading(true);
                  await toggleBaseline(agentId, pluginId);
                  setIsLoading(false);
                  showMessage({
                    type: 'SUCCESS',
                    text: `Current build has been ${isBaseline
                      ? 'unset as baseline successfully. All subsequent builds won\'t be compared to it.'
                      : 'set as baseline successfully. All subsequent builds will be compared to it.'}`,
                  });
                } catch ({ response: { data: { message } = {} } = {} }) {
                  showMessage({
                    type: 'ERROR',
                    text: message || 'There is some issue with your action. Please try again later.',
                  });
                }
                closeModal();
              }}
              disabled={(!isConfirmed && !isBaseline) || isLoading}
            >
              {isLoading && <Spinner disabled />}
              {!isLoading && isBaseline && 'Unset as Baseline'}
              {!isLoading && !isBaseline && 'Set as Baseline'}
            </ActionButton>
            <Button disabled={isLoading} secondary size="large" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </Popup>
  );
};

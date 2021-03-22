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
import { useEffect } from 'react';
import { Button, Popup } from '@drill4j/ui-kit';
import { matchPath, useHistory } from 'react-router-dom';
import tw, { styled } from 'twin.macro';

import { Notification } from 'types/notificaiton';
import { readNotification } from '../api';
import { BuildUpdates } from './build-updates';
import { RecommendedActions } from './recommended-actions';
import { Header } from './header';

interface Props {
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  notification: Notification;
}

const Section = styled.div`
  ${tw`mb-4`}
`;
const ActionsPanel = styled.div`
  ${tw`grid gap-4`}
  grid-template-columns: max-content max-content;
`;

export const NewBuildModal = ({
  isOpen,
  onToggle,
  notification: {
    id = '',
    agentId = '',
    message: {
      currentId: currentBuildVersionId, buildInfo = {}, recommendations = [],
    } = {},
  },
}: Props) => {
  const { push, location: { pathname } } = useHistory();
  const { params: { buildVersion: activeBuildVersion = '' } = {} } = matchPath<{ buildVersion: string }>(pathname, {
    path: '/:page/:agentId/:buildVersion',
  }) || {};
  useEffect(() => {
    id && readNotification(id);
  }, [id]);

  return (
    <Popup
      isOpen={isOpen}
      onToggle={onToggle}
      header={<Header baselineBuild={buildInfo?.parentVersion} />}
      closeOnFadeClick
    >
      <div tw="w-147">
        <div tw="m-6">
          <Section>
            <BuildUpdates
              buildInfo={{
                new: buildInfo?.new,
                modified: buildInfo?.modified,
                deleted: buildInfo?.deleted,
              }}
            />
          </Section>
          {recommendations.length > 0 && (
            <Section>
              <RecommendedActions recommendations={recommendations} />
            </Section>
          )}
          <ActionsPanel>
            {activeBuildVersion !== currentBuildVersionId && (
              <Button
                type="primary"
                size="large"
                onClick={() => { onToggle(false); push(`/full-page/${agentId}/${currentBuildVersionId}/dashboard`); }}
              >
                Go to New Build
              </Button>
            )}
            <Button type="secondary" size="large" onClick={() => onToggle(false)}>
              Ok, Got it
            </Button>
          </ActionsPanel>
        </div>
      </div>
    </Popup>
  );
};

import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Button, Popup } from '@drill4j/ui-kit';
import { useHistory } from 'react-router-dom';

import { Notification } from 'types/notificaiton';
import { readNotification } from '../api';
import { BuildUpdates } from './build-updates';
import { RecommendedActions } from './recommended-actions';
import { Header } from './header';

import styles from './new-build-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  notification: Notification;
}

const newBuildModal = BEM(styles);

export const NewBuildModal = newBuildModal(
  ({
    className,
    isOpen,
    onToggle,
    notification: {
      id = '',
      agentId = '',
      message: {
        currentId: currentBuildVersionId, prevId, buildDiff = {}, recommendations = [],
      } = {},
    },
  }: Props) => {
    const { push, location: { state: activeBuildVersion = '' } } = useHistory();
    React.useEffect(() => {
      id && readNotification(id);
    }, [id]);

    return (
      <Popup
        isOpen={isOpen}
        onToggle={onToggle}
        header={<Header prevBuildVersion={prevId} />}
        closeOnFadeClick
      >
        <div className={className}>
          <Content>
            <Section>
              <BuildUpdates
                buildDiff={{
                  new: buildDiff?.new,
                  modified: buildDiff?.modified,
                  deleted: buildDiff?.deleted,
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
          </Content>
        </div>
      </Popup>
    );
  },
);

const Content = newBuildModal.content('div');
const Section = newBuildModal.section('div');
const ActionsPanel = newBuildModal.actionsPanel('div');

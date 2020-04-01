import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Button } from 'forms';
import { Popup } from 'components';
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
      message: {
        prevId, buildDiff = {}, recommendations = [],
      } = {},
    },
  }: Props) => {
    React.useEffect(() => {
      id && readNotification(id);
    }, [id]);

    return (
      <Popup
        isOpen={isOpen}
        onToggle={onToggle}
        header={<Header prevBuildVersion={prevId} />}
        type="info"
        closeOnFadeClick
      >
        <div className={className}>
          <Content>
            <Section>
              <BuildUpdates
                buildDiff={{
                  new: buildDiff.new,
                  modified: buildDiff.modified,
                  deleted: buildDiff.deleted,
                }}
              />
            </Section>
            {recommendations.length > 0 && (
              <Section>
                <RecommendedActions recommendations={recommendations} />
              </Section>
            )}
            <OkButton type="primary" onClick={() => onToggle(false)}>
              Ok, Got it!
            </OkButton>
          </Content>
        </div>
      </Popup>
    );
  },
);

const Content = newBuildModal.content('div');
const Section = newBuildModal.section('div');
const OkButton = newBuildModal.okButton(Button);

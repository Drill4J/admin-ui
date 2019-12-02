import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Button } from '../../../forms';
import { Popup } from '../../../components';
import { readNotification } from '../api';
import { BuildUpdates } from './build-updates';
import { BuildAlias } from './build-alias';
import { RecommendedActions } from './recommended-actions';
import { Header } from './header';
import { NewBuildNotification } from '../../../types/new-build-notification';

import styles from './new-build-modal.module.scss';

interface Props extends RouteComponentProps {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  notification: NewBuildNotification;
}

const newBuildModal = BEM(styles);

export const NewBuildModal = withRouter(
  newBuildModal(
    ({
      className,
      isOpen,
      onToggle,
      notification: {
        id = '',
        agentId = '',
        additionalInfo: { currentId, prevId, prevAlias, buildDiff = {}, recommendations = [] } = {},
      },
    }: Props) => {
      const [currentAlias, setCurrentAlias] = React.useState('');
      React.useEffect(() => {
        id && readNotification(id);
      }, [id]);

      return (
        <Popup
          isOpen={isOpen}
          onToggle={onToggle}
          header={
            <Header
              prevBuildVersion={{
                prevAlias,
                prevId,
              }}
            />
          }
          type="info"
          closeOnFadeClick
        >
          <div className={className}>
            <Content>
              <BuildAliasField
                agentId={agentId}
                currentId={currentId}
                currentAlias={currentAlias}
                setCurrentAlias={setCurrentAlias}
              />
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
  ),
);

const Content = newBuildModal.content('div');
const BuildAliasField = newBuildModal.buildAlias(BuildAlias);
const Section = newBuildModal.section('div');
const OkButton = newBuildModal.okButton(Button);

import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { Panel } from '../../../../../layouts';
import { Button } from '../../../../../forms';
import { Popup } from '../../../../../components';
import { ReactComponent as LogoSvg } from './logo.svg';
import { BuildUpdates } from './build-updates';
import { BuildVersionName } from './build-version-name';
import { RecommendedActions } from './recommended-actions';
import { BuildArrived } from './build-arrived';

import styles from './finish-scope-modal.module.scss';

interface Props extends RouteComponentProps {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
}

const newBuildModal = BEM(styles);

export const NewBuildModal = withRouter(
  newBuildModal(({ className, isOpen, onToggle }: Props) => {
    const newBuild = {
      current: { id: 847732907, alias: 'new build' },
      prev: { id: 847732906, alias: 'new build' },
      buildDiff: { mod: 100, new: 200, del: 50 },
      actions: [
        'Run recommended tests to cover modified methods',
        'Update your tests to cover new methods',
        'Remove tests that become obsolete',
      ],
    };
    return (
      <Popup
        isOpen={isOpen}
        onToggle={onToggle}
        header={
          <Panel>
            <Logo />
            <BuildArrived newBuild={newBuild} />
          </Panel>
        }
        type="info"
        closeOnFadeClick={true}
      >
        <div className={className}>
          <Content>
            <BuildVersionName newBuild={newBuild} />
            <Block>
              <BuildUpdates newBuild={newBuild} />
            </Block>
            <Block>
              <RecommendedActions newBuild={newBuild} />
            </Block>
            <Block>
              <OkButton type="primary" onClick={() => onToggle(false)}>
                Ok, Got it!
              </OkButton>
            </Block>
          </Content>
        </div>
      </Popup>
    );
  }),
);

const Logo = newBuildModal.logo(LogoSvg);
const Content = newBuildModal.content('div');
const Block = newBuildModal.block('div');
const OkButton = newBuildModal.okButton(Button);

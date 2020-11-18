import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Button, Popup } from '@drill4j/ui-kit';

import styles from './baseline-build-modal.module.scss';

interface Props {
  className?: string;
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  isBaseline: boolean;
  toggleBaseline: () => void;
}

const baselineBuildModal = BEM(styles);

export const BaselineBuildModal = baselineBuildModal(({
  className, isOpen, onToggle, isBaseline, toggleBaseline,
}: Props) => (
  <Popup
    isOpen={isOpen}
    onToggle={onToggle}
    header={`${isBaseline ? 'Unlink' : 'Mark'} Build as Baseline`}
    closeOnFadeClick
  >
    <div className={className}>
      <Content>
        <Message>
          {isBaseline
            ? (
              <>
                By confirming, you will unlink this build as baseline. All<br />
                subsequent builds won’t be compared to it.
              </>
            )
            : (
              <>
                By confirming, you will make the current build a baseline.<br />
                Remember to run a regression to be able to determine the<br />
                amount of saved time.
              </>
            )}
        </Message>
        <ActionsPanel>
          <Button type="primary" size="large" onClick={() => { toggleBaseline(); onToggle(false); }}>
            {isBaseline ? 'Unlink' : 'Mark'} as Baseline
          </Button>
          <Button type="secondary" size="large" onClick={() => onToggle(false)}>
            Cancel
          </Button>
        </ActionsPanel>
      </Content>
    </div>
  </Popup>
));

const Content = baselineBuildModal.content('div');
const Message = baselineBuildModal.message('span');
const ActionsPanel = baselineBuildModal.actionsPanel('div');

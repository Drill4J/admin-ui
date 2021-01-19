import { useState } from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import {
  Button, Popup, Checkbox, Panel,
} from '@drill4j/ui-kit';

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
}: Props) => {
  const [isConfirmed, setIsConfirmed] = useState(isBaseline);

  return (
    <Popup
      isOpen={isOpen}
      onToggle={onToggle}
      header={`${isBaseline ? 'Unset' : 'Set'} as Baseline Build`}
      closeOnFadeClick
    >
      <div className={className}>
        <Content>
          <Message>
            {isBaseline
              ? (
                <>
                  By confirming this action, you will unset this build as baseline. All<br />
                  subsequent builds won’t be compared to it.
                </>
              )
              : (
                <>
                  By confirming this action, you will set the current build as <br />
                  baseline. All subsequent builds will be compared to it.
                </>
              )}
          </Message>
          {!isBaseline && (
            <Message verticalAlign="start">
              <Checkbox checked={isConfirmed} onChange={() => setIsConfirmed(!isConfirmed)} />
              <span>
                I understand that it is necessary to run full regression to be <br />
                able to determine the amount of saved time
              </span>
            </Message>
          )}
          <ActionsPanel>
            <Button
              type="primary"
              size="large"
              onClick={() => {
                toggleBaseline();
                onToggle(false);
              }}
              disabled={!isConfirmed}
            >
              {isBaseline ? 'Unset' : 'Set'} as Baseline
            </Button>
            <Button type="secondary" size="large" onClick={() => onToggle(false)}>
              Cancel
            </Button>
          </ActionsPanel>
        </Content>
      </div>
    </Popup>
  );
});

const Content = baselineBuildModal.content('div');
const Message = baselineBuildModal.message(Panel);
const ActionsPanel = baselineBuildModal.actionsPanel('div');

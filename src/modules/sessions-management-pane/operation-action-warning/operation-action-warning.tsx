import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';
import { Button, NegativeActionButton, Panel } from '@drill4j/ui-kit';

import { OperationType } from '../store/reducer';

import styles from './operation-action-warning.module.scss';

interface Props {
  className?: string;
  handleDecline: () => void;
  handleConfirm: () => void;
  children: React.ReactNode;
  operationType: OperationType;
}

const operationActionWarning = BEM(styles);

export const OperationActionWarning = operationActionWarning(({
  className, handleConfirm, handleDecline, children, operationType,
} : Props) => {
  const ConfirmButton = operationType === 'abort' ? NegativeActionButton : Button;
  return (
    <Panel className={className} data-test="operation-action-warning">
      <span>{children}</span>
      <Actions>
        <Button
          type="secondary"
          size="small"
          onClick={handleDecline}
          data-test="operation-action-warning:no-button"
        >
          No
        </Button>
        <ConfirmButton
          type="primary"
          size="small"
          onClick={handleConfirm}
          data-test="operation-action-warning:yes-button"
        >
          Yes
        </ConfirmButton>
      </Actions>
    </Panel>
  );
});

const Actions = operationActionWarning.actions('div');

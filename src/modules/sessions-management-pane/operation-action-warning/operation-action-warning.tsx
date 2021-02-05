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
import { BEM } from '@redneckz/react-bem-helper';
import { Button, NegativeActionButton } from '@drill4j/ui-kit';

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
    <div className={`${className} flex items-center w-full`} data-test="operation-action-warning">
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
    </div>
  );
});

const Actions = operationActionWarning.actions('div');

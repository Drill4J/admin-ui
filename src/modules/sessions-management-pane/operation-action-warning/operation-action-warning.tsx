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
import { Button, NegativeActionButton, Spinner } from '@drill4j/ui-kit';
import 'twin.macro';

import { OperationType } from '../store/reducer';

interface Props {
  handleDecline: () => void;
  handleConfirm: () => void;
  children: React.ReactNode;
  operationType: OperationType;
  loading: boolean;
}

export const OperationActionWarning = ({
  handleConfirm, handleDecline, children, operationType, loading,
} : Props) => {
  const ConfirmButton: any = operationType === 'abort' ? NegativeActionButton : Button;
  return (
    <div className="flex items-center w-full h-full font-regular text-12 leading-20" data-test="operation-action-warning">
      <span>{children}</span>
      <div tw="flex justify-between ml-4 min-w-104px">
        <Button
          secondary
          size="small"
          onClick={handleDecline}
          data-test="operation-action-warning:no-button"
        >
          No
        </Button>
        <ConfirmButton
          primary
          size="small"
          onClick={handleConfirm}
          data-test="operation-action-warning:yes-button"
          disabled={loading}
        >
          {loading ? <Spinner disabled /> : 'Yes'}
        </ConfirmButton>
      </div>
    </div>
  );
};

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
        <div className="d-flex flex-column g-6 pt-4 px-6 pb-6">
          <Message className="d-flex align-items-center w-100">
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
            <Message className="d-flex align-items-start g-2 w-100">
              <Checkbox checked={isConfirmed} onChange={() => setIsConfirmed(!isConfirmed)} />
              <span>
                I understand that it is necessary to run full regression to be <br />
                able to determine the amount of saved time
              </span>
            </Message>
          )}
          <div className="d-flex gx-4">
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
          </div>
        </div>
      </div>
    </Popup>
  );
});

const Message = baselineBuildModal.message('div');

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
import {
  Button, Popup, Checkbox,
} from '@drill4j/ui-kit';
import tw, { styled } from 'twin.macro';

interface Props {
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  isBaseline: boolean;
  toggleBaseline: () => void;
}

const Message = styled.div`
  ${tw`text-14 leading-20`}
`;

export const BaselineBuildModal = ({
  isOpen, onToggle, isBaseline, toggleBaseline,
}: Props) => {
  const [isConfirmed, setIsConfirmed] = useState(isBaseline);

  return (
    <Popup
      isOpen={isOpen}
      onToggle={onToggle}
      header={`${isBaseline ? 'Unset' : 'Set'} as Baseline Build`}
      closeOnFadeClick
    >
      <div tw="w-108">
        <div className="flex flex-col gap-6 pt-4 px-6 pb-6">
          <Message className="flex items-center w-full">
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
            <Message className="flex items-start gap-2 w-full">
              <Checkbox checked={isConfirmed} onChange={() => setIsConfirmed(!isConfirmed)} />
              <span>
                I understand that it is necessary to run full regression to be <br />
                able to determine the amount of saved time
              </span>
            </Message>
          )}
          <div className="flex gap-x-4">
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
};

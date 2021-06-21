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
import { Button, Popup, NegativeActionButton } from '@drill4j/ui-kit';
import 'twin.macro';

interface Props {
  isOpen: boolean;
  onToggle: (value: boolean) => void;
  setUnlocked: (value: boolean) => void;
}

export const UnlockingSystemSettingsFormModal = ({ isOpen, onToggle, setUnlocked }: Props) => (
  <Popup
    isOpen={isOpen}
    onToggle={onToggle}
    header="Unlocking Secured Field"
    type="error"
    closeOnFadeClick
  >
    <div tw="w-108 p-6">
      <span tw="text-14">
        Please be aware that any change to the package list will result in a
        <strong> complete loss of gathered data </strong>
        in plugins that have been using these packages.
      </span>
      <div tw="flex mt-6 gap-x-4">
        <NegativeActionButton
          size="large"
          onClick={() => {
            setUnlocked(true);
            onToggle(false);
          }}
        >
          Unlock and Proceed
        </NegativeActionButton>
        <Button type="secondary" size="large" onClick={() => onToggle(false)}>
          Cancel
        </Button>
      </div>
    </div>
  </Popup>
);

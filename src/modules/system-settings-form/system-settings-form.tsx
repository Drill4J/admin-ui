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
  Icons, Tooltip, GeneralAlerts, FormGroup,
} from '@drill4j/ui-kit';
import { Field } from 'react-final-form';
import 'twin.macro';

import { Fields } from 'forms';
import { UnlockingSystemSettingsFormModal } from 'modules';
import { parsePackages, formatPackages } from 'utils';

interface Props {
  invalid: boolean;
  isServiceGroup?: boolean;
}

export const SystemSettingsForm = ({ invalid, isServiceGroup }: Props) => {
  const [unlocked, setUnlocked] = useState(false);
  const [isUnlockingModalOpened, setIsUnlockingModalOpened] = useState(false);

  return (
    <div tw="space-y-10">
      <GeneralAlerts type="INFO">
        {isServiceGroup
          ? 'System settings are related only to Java agents.'
          : 'Information related to your application / project.'}
      </GeneralAlerts>
      <div tw="flex flex-col items-center gap-y-6">
        <div>
          <div tw="flex items-center gap-x-2 mb-2">
            <span tw="font-bold text-14 leading-20 text-monochrome-black">Project Package(s)</span>
            <div
              className={`flex items-center ${unlocked ? 'text-red-default' : 'text-monochrome-default'}`}
              onClick={() => {
                unlocked ? !invalid && setUnlocked(false) : setIsUnlockingModalOpened(true);
              }}
            >
              {unlocked ? (
                <Icons.Unlocked />
              ) : (
                <Tooltip
                  message={(
                    <div tw="flex flex-col items-center w-full font-regular text-12 leading-16">
                      <span>Secured from editing.</span>
                      <span> Click to unlock.</span>
                    </div>
                  )}
                >
                  <Icons.Locked />
                </Tooltip>
              )}
            </div>
          </div>
          <Field
            tw="w-97 h-20"
            name="systemSettings.packages"
            component={Fields.Textarea}
            parse={parsePackages}
            format={formatPackages}
            placeholder="e.g. com/example/mypackage&#10;foo/bar/baz&#10;and so on."
            disabled={!unlocked}
          />
          {unlocked && (
            <div tw="w-97 text-12 leading-16 text-monochrome-default">
              Make sure you add application packages only, otherwise agent&apos;s performance will be affected.
              Use new line as a separator, &quot;!&quot; before package/class for excluding and use &quot;/&quot; in a package path.
            </div>
          )}
        </div>
        <FormGroup tw="w-97" label="Header Mapping" optional>
          <Field
            name="systemSettings.sessionIdHeaderName"
            component={Fields.Input}
            placeholder="Enter session header name"
          />
        </FormGroup>
        {isUnlockingModalOpened && (
          <UnlockingSystemSettingsFormModal
            isOpen={isUnlockingModalOpened}
            onToggle={setIsUnlockingModalOpened}
            setUnlocked={setUnlocked}
          />
        )}
      </div>
    </div>
  );
};

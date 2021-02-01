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
import { Field } from 'react-final-form';
import { GeneralAlerts, Icons, Tooltip } from '@drill4j/ui-kit';
import 'twin.macro';

import { Fields } from 'forms';

export const JsSystemSettingsForm = () => (
  <div tw="space-y-10">
    <GeneralAlerts type="INFO">
      Provide information related to your application / project.
    </GeneralAlerts>
    <div tw="flex justify-center">
      <div tw="w-97 space-y-2">
        <div tw="flex items-center gap-x-2">
          <span tw="font-bold text-14 leading-20 text-monochrome-black">Target Host</span>
          <Tooltip message="Specify URL where your application is located">
            <Icons.Info tw="text-monochrome-default" />
          </Tooltip>
        </div>
        <Field
          name="systemSettings.targetHost"
          component={Fields.Input}
          placeholder="http://example.com"
        />
      </div>
    </div>
  </div>
);

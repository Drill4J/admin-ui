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
import { FormGroup, GeneralAlerts } from '@drill4j/ui-kit';
import 'twin.macro';

import { Fields } from 'forms';
import { parsePackages, formatPackages, dotsAndSlashesToSlash } from 'utils';

export const SystemSettingsStep = () => (
  <div tw="space-y-10">
    <GeneralAlerts type="INFO">
      Provide information related to your application / project.
    </GeneralAlerts>
    <div tw="flex flex-col items-center gap-y-6">
      <div tw="space-y-2">
        <FormGroup tw="w-97" label="Project Package(s)">
          <Field
            tw="h-20"
            name="systemSettings.packages"
            component={Fields.Textarea}
            parse={(value) => parsePackages(dotsAndSlashesToSlash(value))}
            format={formatPackages}
            placeholder="e.g. com/example/mypackage&#10;foo/bar/baz&#10;and so on."
          />
        </FormGroup>
        <div tw="w-97 text-12 leading-16 text-monochrome-default">
          Make sure you add application packages only, otherwise agent&apos;s performance will be affected.
          Use new line as a separator, &quot;!&quot; before package/class for excluding and use &quot;/&quot; in a package path.
        </div>
      </div>
      <FormGroup tw="w-97" label="Header Mapping" optional>
        <Field
          name="systemSettings.sessionIdHeaderName"
          component={Fields.Input}
          placeholder="Enter session header name"
          label="Session header name"
        />
      </FormGroup>
    </div>
  </div>
);

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
import { Popup, Button } from '@drill4j/ui-kit';
import { Link } from 'react-router-dom';
import 'twin.macro';

interface Props {
  setNextLocation: (location: string) => void;
  path: string;
}

export const UnSaveChangeModal = ({ setNextLocation, path }: Props) => (
  <Popup isOpen={Boolean(path)} onToggle={() => setNextLocation('')} header="Unsaved Changes">
    <div tw="pt-5 px-6 pb-6 w-108">
      <div tw="mb-6 text-14 leading-20 text-monochrome-black">
        There are unsaved changes. If you would like to keep changes,
        <br /> press the “Continue Editing” button.
      </div>
      <div tw="flex gap-x-4">
        <Button primary size="large" onClick={() => setNextLocation('')}>
          Continue Editing
        </Button>
        <Link
          to={{ pathname: path, state: { pristine: true } }}
          onClick={() => setNextLocation('')}
        >
          <Button secondary size="large">
            Leave Without Saving
          </Button>
        </Link>
      </div>
    </div>
  </Popup>
);

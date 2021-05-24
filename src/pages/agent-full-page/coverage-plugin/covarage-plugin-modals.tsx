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
import { useBuildVersion } from 'hooks';
import { ActiveScope } from 'types/active-scope';
import { useCoveragePluginState, useCoveragePluginDispatch, openModal } from './store';
import { RenameScopeModal } from './scope/rename-scope-modal';
import { FinishScopeModal } from './scope/finish-scope-modal';
import { DeleteScopeModal } from './scope/delete-scope-modal';

const modals = {
  RenameScopeModal,
  FinishScopeModal,
  DeleteScopeModal,
};

export const CoveragePluginModals = () => {
  const { openedModalName, scopeId } = useCoveragePluginState();
  const dispatch = useCoveragePluginDispatch();
  const scope = useBuildVersion<ActiveScope>(`/build/scopes/${scopeId}`);

  const Modal = openedModalName && modals[openedModalName];
  return (
    <>
      {openedModalName && Modal && (
        <Modal
          isOpen={Boolean(openedModalName)}
          onToggle={() => dispatch(openModal())}
          scope={scope}
        />
      )}
    </>
  );
};

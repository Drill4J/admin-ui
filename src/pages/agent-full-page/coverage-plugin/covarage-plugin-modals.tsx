import * as React from 'react';

import { ManageSessionsPaneProvider as ManageSessionsModal } from 'modules';
import { useCoveragePluginState, useCoveragePluginDispatch, openModal } from './store';
import { RenameScopeModal } from './scope/rename-scope-modal';
import { FinishScopeModal } from './scope/finish-scope-modal';
import { DeleteScopeModal } from './scope/delete-scope-modal';

const modals = {
  RenameScopeModal,
  FinishScopeModal,
  DeleteScopeModal,
  ManageSessionsModal,
};

export const CoveragePluginModals = () => {
  const { openedModalName, scope } = useCoveragePluginState();
  const dispatch = useCoveragePluginDispatch();

  const Modal = openedModalName && modals[openedModalName];
  return (
    <>
      {openedModalName && Modal && (
        <Modal
          isOpen={Boolean(openedModalName)}
          onToggle={() => dispatch(openModal(undefined, null))}
          scope={scope}
        />
      )}
    </>
  );
};

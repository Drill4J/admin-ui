import * as React from 'react';

import { usePluginState, usePluginDispatch, openModal } from './store';
import { RenameScopeModal } from './scope/rename-scope-modal';
import { FinishScopeModal } from './scope/finish-scope-modal';
import { DeleteScopeModal } from './scope/delete-scope-modal';

const modals = {
  RenameScopeModal,
  FinishScopeModal,
  DeleteScopeModal,
};

export const CoveragePluginModals = () => {
  const { openedModalName, scope } = usePluginState();
  const dispatch = usePluginDispatch();

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

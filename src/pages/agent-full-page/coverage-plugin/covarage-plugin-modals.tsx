import * as React from 'react';

import { PluginContext, openModal } from './store';
import { RenameScopeModal } from './scope/rename-scope-modal';
import { FinishScopeModal } from './scope/finish-scope-modal';
import { DeleteScopeModal } from './scope/delete-scope-modal';

const modals = {
  RenameScopeModal,
  FinishScopeModal,
  DeleteScopeModal,
};

export const CoveragePluginModals = () => {
  const {
    state: { openedModalName, scope },
    dispatch,
  } = React.useContext(PluginContext);

  const Modal = openedModalName && modals[openedModalName];
  return (
    <>
      {openedModalName && Modal && (
        <Modal
          isOpen={Boolean(openedModalName)}
          onToggle={() => dispatch(openModal(''))}
          scope={scope}
        />
      )}
    </>
  );
};

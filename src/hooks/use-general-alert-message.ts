import { useState } from 'react';

import { Message } from 'types/message';

export function useGeneralAlertMessage() {
  const [generalAlertMessage, setGeneralAlertMessage] = useState<Message | null>(null);
  const showGeneralAlertMessage = (incommingMessage: Message) => {
    setGeneralAlertMessage(incommingMessage);
    incommingMessage.type === 'SUCCESS' && setTimeout(() => setGeneralAlertMessage(null), 7000);
  };

  return { generalAlertMessage, showGeneralAlertMessage };
}

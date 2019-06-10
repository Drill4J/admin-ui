import * as React from 'react';

import { MessagePanel } from '../components';
import { Message } from '../types/message';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export const NotificationManagerContext = React.createContext<{
  showMessage: (message: Message) => void;
  closeMessage: () => void;
}>({ showMessage: () => {}, closeMessage: () => {} });

export const NotificationManager = ({ children }: Props) => {
  const [message, setMessage] = React.useState<Message | null>();

  function handleShowMessage(incommingMessage: Message) {
    if (incommingMessage.type === 'SUCCESS') {
      setMessage(incommingMessage);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }

    setMessage(incommingMessage);
  }
  return (
    <NotificationManagerContext.Provider
      value={{ showMessage: handleShowMessage, closeMessage: () => setMessage(null) }}
    >
      {message && <MessagePanel message={message} onClose={() => setMessage(null)} />}
      {children}
    </NotificationManagerContext.Provider>
  );
};

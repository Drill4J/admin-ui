import * as React from 'react';
import { BEM } from '@redneckz/react-bem-helper';

import { Panel } from 'layouts';
import { Icons } from 'components';
import { Message } from 'types/message';

import styles from './message-panel.module.scss';

interface Props {
  className?: string;
  message: Message;
  onClose(): void;
}

const messagePanel = BEM(styles);

export const MessagePanel = messagePanel(
  ({ className, message: { type, text }, onClose }: Props) => (
    <div className={className}>
      <Content type={type}>
        <Panel align="space-between">
          <Panel>
            {getMessageIcon(type)}
            <MessageText>{text}</MessageText>
          </Panel>
          <CloseIcon onClick={onClose} />
        </Panel>
      </Content>
    </div>
  ),
);

const Content = messagePanel.content('div');
const MessageText = messagePanel.messageText('div');
const CloseIcon = messagePanel.closeIcon(Icons.Close);
const MessageIconWrapper = messagePanel.messageIconWrapper('div');

function getMessageIcon(type: 'SUCCESS' | 'ERROR' | 'WARNING' | 'INFO') {
  switch (type) {
    case 'ERROR': {
      return (
        <MessageIconWrapper type={type}>
          <Icons.Warning height={16} width={16} />
        </MessageIconWrapper>
      );
    }
    case 'SUCCESS': {
      return (
        <MessageIconWrapper type={type}>
          <Icons.Checkbox height={16} width={16} />
        </MessageIconWrapper>
      );
    }
    case 'WARNING': {
      return (
        <MessageIconWrapper type={type}>
          <Icons.Warning height={16} width={16} />
        </MessageIconWrapper>
      );
    }
    default: {
      return (
        <MessageIconWrapper type={type}>
          <Icons.Info height={16} width={16} />
        </MessageIconWrapper>
      );
    }
  }
}

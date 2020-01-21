import axios from 'axios';

import { Message } from 'types/message';

export async function toggleStandby(agentId: string, onError?: (message: Message) => void) {
  try {
    await axios.post(`/agents/${agentId}/toggle-standby`);
  } catch ({ response: { data: { message } = {} } = {} }) {
    onError && onError({ type: 'ERROR', text: message || 'Internal service error' });
  }
}

import axios from 'axios';

import { AGENT_STATUS } from 'common/constants';
import { Message } from 'types/message';
import { AgentStatus } from 'types/agent-status';

export async function toggleAgent(
  agentId?: string,
  status?: AgentStatus,
  callback?: (message: Message) => void,
): Promise<void> {
  try {
    await axios.post(`/agents/${agentId}/toggle`);
    callback && callback({ type: 'SUCCESS', text: `Agent has been ${status === AGENT_STATUS.ONLINE ? 'disabled' : 'enabled'}.` });
  } catch ({ response: { data: { message = '' } = {} } = {} }) {
    callback && callback({ type: 'ERROR', text: message || 'There is some issue with your action. Please try again later.' });
  }
}

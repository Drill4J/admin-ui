import axios from 'axios';

export async function toggleStandby(agentId: string, onError?: (message: string) => void) {
  try {
    await axios.post(`/agents/${agentId}/toggle-standby`);
  } catch ({ response: { data: { message } = {} } = {} }) {
    onError && onError(message || 'Internal service error');
  }
}

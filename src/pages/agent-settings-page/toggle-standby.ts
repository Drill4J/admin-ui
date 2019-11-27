import axios from 'axios';

export async function toggleStandby(agentId: string, showError: (message: string) => void) {
  try {
    await axios.post(`/agents/${agentId}/toggle-standby`);
    showError('');
  } catch ({ response: { data: { message } = {} } = {} }) {
    showError(message);
  }
}

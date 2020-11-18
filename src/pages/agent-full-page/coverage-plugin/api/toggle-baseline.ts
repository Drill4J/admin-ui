import axios from 'axios';

export async function toggleBaseline(agentId: string, pluginId: string): Promise<void> {
  await axios.post(`/agents/${agentId}/plugins/${pluginId}/dispatch-action`, {
    type: 'TOGGLE_BASELINE',
  });
}

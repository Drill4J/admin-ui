import axios from 'axios';

export async function readAllNotifications(
  { onSuccess, onError }: { onSuccess?: () => void; onError?: (message: string) => void } = {},
) {
  try {
    await axios.patch('/notifications/read');
    onSuccess && onSuccess();
  } catch ({ response: { data: { message } = {} } = {} }) {
    onError && onError(message || 'There is some issue with your action. Please try again.');
  }
}

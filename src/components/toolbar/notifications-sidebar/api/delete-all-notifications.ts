import axios from 'axios';

export async function deleteAllNotifications(
  { onSuccess, onError }: { onSuccess?: () => void; onError?: (message: string) => void } = {},
) {
  try {
    await axios.delete('/notifications');
    onSuccess && onSuccess();
  } catch ({ response: { data: { message } = {} } = {} }) {
    onError && onError(message || 'There is some issue with your action. Please try again.');
  }
}

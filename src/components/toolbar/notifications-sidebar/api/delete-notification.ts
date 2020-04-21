import axios from 'axios';

export async function deleteNotification(
  notificationId: string,
  { onSuccess, onError }: { onSuccess?: () => void; onError?: (message: string) => void } = {},
) {
  try {
    await axios.delete(`/notifications/${notificationId}`);
    onSuccess && onSuccess();
  } catch ({ response: { data: { message } = {} } = {} }) {
    onError && onError(message || 'There is some issue with your action. Please try again.');
  }
}

import axios from 'axios';

export async function readNotification(
  notificationId: string,
  { onSuccess, onError }: { onSuccess?: () => void; onError?: (message: string) => void } = {},
) {
  try {
    await axios.patch(`/notifications/${notificationId}/read`);
    onSuccess && onSuccess();
  } catch ({ response: { data: { message } = {} } = {} }) {
    onError && onError(message);
  }
}

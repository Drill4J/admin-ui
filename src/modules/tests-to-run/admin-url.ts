export const adminUrl = new URL(
  process.env.REACT_APP_ENV
    ? `${window.location.protocol}//${window.location.host}`
    : `http://${process.env.REACT_APP_API_HOST || window.location.host}`,
);

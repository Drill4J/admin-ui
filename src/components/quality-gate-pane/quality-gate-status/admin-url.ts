export const adminUrl = new URL(
  process.env.REACT_APP_ENV
    ? `http://${window.location.host}`
    : `http://${process.env.REACT_APP_API_HOST || window.location.host}`,
);

export const adminUrl = new URL(
  process.env.REACT_APP_ENV
    ? `http://${window.location.host}`
    : 'http://ecse005002af.epam.com:8090',
);

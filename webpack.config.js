const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'Drill4J',
    projectName: 'Admin-UI',
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components/'),
        modules: path.resolve(__dirname, 'src/modules/'),
        hooks: path.resolve(__dirname, 'src/hooks/'),
        types: path.resolve(__dirname, 'src/types/'),
        common: path.resolve(__dirname, 'src/common/'),
        utils: path.resolve(__dirname, 'src/utils/'),
        'notification-manager': path.resolve(__dirname, 'src/notification-manager/'),
        forms: path.resolve(__dirname, 'src/forms/'),
        layouts: path.resolve(__dirname, 'src/layouts/'),
        pages: path.resolve(__dirname, 'src/pages/'),
        routes: path.resolve(__dirname, 'src/routes/'),
      },
      fallback: { timers: require.resolve('timers-browserify') },
    },
    plugins: [
      new Dotenv({
        path: './.env.local',
      }),
    ],
  });
};

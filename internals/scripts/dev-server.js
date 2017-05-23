const path = require('path');
const MFS = require('memory-fs');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const createClientConfig = require('../webpack/webpack.client');
const createServerConfig = require('../webpack/webpack.server');

// Setup watching of client assets.
const setupClient = app => new Promise((resolve) => {
  const clientConfig = createClientConfig(process.env);

  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  );

  // Add hot-reload related code to entry chunks.
  Object.keys(clientConfig.entry).forEach((name) => {
    clientConfig.entry[name] = ['webpack-hot-middleware/client'].concat(clientConfig.entry[name]);
  });

  const clientBundler = webpack(clientConfig);

  const devMiddleware = webpackDevMiddleware(clientBundler, {
    publicPath: clientConfig.output.publicPath,
    noInfo: true,
  });

  clientBundler.plugin('done', (stats) => {
    const json = stats.toJson();
    json.errors.forEach(error => console.error(error));
    json.warnings.forEach(warning => console.warn(warning));

    const fs = devMiddleware.fileSystem;
    const templatePath = path.join(clientConfig.output.path, '../index.template.html');
    const manifestPath = path.join(clientConfig.output.path, 'vue-ssr-client-manifest.json');

    if (fs.existsSync(templatePath) && fs.existsSync(manifestPath)) {
      const template = fs.readFileSync(templatePath, 'utf-8');
      const clientManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

      resolve({ template, clientManifest });
    }
  });

  app.use(devMiddleware);
  app.use(webpackHotMiddleware(clientBundler));
});

// Setup watching of server assets.
const setupServer = () => new Promise((resolve, reject) => {
  const serverConfig = createServerConfig(process.env);
  const serverBundler = webpack(serverConfig);

  const mfs = new MFS();

  serverBundler.outputFileSystem = mfs;
  serverBundler.watch({}, (err, stats) => {
    if (err) reject(err);
    const json = stats.toJson();
    json.errors.forEach(error => console.error(error));
    json.warnings.forEach(warning => console.warn(warning));

    // Read bundle generated by Vue SSR webpack plugin.
    const bundlePath = path.resolve(serverConfig.output.path, 'vue-ssr-server-bundle.json');
    const bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
    resolve(bundle);
  });
});

// Returns a new Promise which resolves when both client & server assets are ready.
module.exports = app => Promise.all([setupServer(), setupClient(app)]);

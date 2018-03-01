import express from 'express';
import webpack from 'webpack';
import path from 'path';
import open from 'open';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';
import browserSync from 'browser-sync';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import historyApiFallback from 'connect-history-api-fallback';
import webpackConfigBuilder from '../webpack.config';
import recipes from '../recipes.json';

/*eslint-disable no-console */

const port = process.env.PORT || 8000;
const app = express();
const webpackConfig = webpackConfigBuilder('development');
const bundler = webpack(webpackConfig);

app.use(webpackDevMiddleware(bundler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  stats: { colors: true }
}));
app.use(webpackHotMiddleware(bundler));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.post('/authenticate', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({access_token: "secrectauth123", user_info: req.body}));
});

app.post('/recipes', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(recipes));
});

app.listen(port, function(err) {
  if (err) {
    console.log('error: ', err);
  } else {
    open(`localhost:${port}`);
    console.log(`listening at localhost:${port}...`);
  }
});

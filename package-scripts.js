const { series, crossEnv, concurrent, rimraf, ifWindows } = require('nps-utils');

module.exports = {
  scripts: {
    default: 'nps webpack',
    build: 'nps webpack.build',
    webpack: {
      default: 'nps webpack.server',
      build: {
        before: rimraf('dist'),
        default: 'nps webpack.build.production',
        development: {
          default: series(
            'nps webpack.build.before',
            'webpack --progress -d --env.config=development'
          ),
          extractCss: series(
            'nps webpack.build.before',
            'webpack --progress -d --env.extractCss, --env.config=development'
          ),
          serve: series.nps(
            'webpack.build.development',
            'serve'
          ),
        },
        production: {
          inlineCss: series(
            'nps webpack.build.before',
            'webpack --progress -p --env.production --env.config=production'
          ),
          default: series(
            'nps webpack.build.before',
            'webpack --progress -p --env.production --env.extractCss --env.config=production'
          ),
          serve: series.nps(
            'webpack.build.production',
            'serve'
          ),
        }
      },
      server: {
        default: `webpack-dev-server -d --inline --env.server`,
        dashboard: `webpack-dashboard -- webpack-dev-server -d --inline --env.server`,
        extractCss: `webpack-dev-server -d --inline --env.server --env.extractCss`,
        hmr: `webpack-dev-server -d --inline --hot --env.server`
      },
    },
    serve: 'http-server dist --cors --gzip'
  },
}

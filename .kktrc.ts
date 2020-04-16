import path from 'path';
import { OptionConf,  } from 'kkt';
import webpack, { Configuration } from 'webpack';

export interface KKTOpts extends OptionConf {
  yargsArgs: OptionConf['yargsArgs'] & {
    bundle: boolean;
    mini: boolean;
  }
}

export const loaderOneOf = [
  require.resolve('@kkt/loader-less'),
];

export default (conf: Configuration, options: KKTOpts) => {
  if (options.yargsArgs && options.yargsArgs.bundle) {
    const { MiniCssExtractPlugin } = options;
    conf.devtool = false;
    const regexp = /(HtmlWebpackPlugin|InlineChunkHtmlPlugin|InterpolateHtmlPlugin|ModuleNotFoundPlugin|DefinePlugin|ManifestPlugin|IgnorePlugin|GenerateSW|MiniCssExtractPlugin)/;
    conf.plugins = (conf.plugins || []).map((item) => {
      if (item.constructor && item.constructor.name && regexp.test(item.constructor.name)) {
        return null;
      }
      return item;
    }).filter(Boolean) as webpack.Plugin[];
    conf.entry = './src/index.ts';
    conf.output = {
      path: path.join(process.cwd(), 'dist'),
      filename: 'uiw.js',
      library: 'UIW',
      libraryTarget: 'umd',
    }
    conf.externals = {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    }
    conf.optimization = {
      minimize: options.isEnvProduction,
      minimizer: [],
    };
    if (options.yargsArgs && options.yargsArgs.mini) {
      conf.output.filename = 'uiw.min.js';
      conf.plugins = [
        ...(conf.plugins || []),
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: 'uiw.min.css',
          // allChunks: true because we want all css to be included in the main
          // css bundle when doing code splitting to avoid FOUC:
          // https://github.com/facebook/create-react-app/issues/2415
          allChunks: true,
        } as any)
      ];
    } else {
      conf.optimization.minimize = false;
      conf.plugins = [
        ...conf.plugins,
        new MiniCssExtractPlugin({
          filename: 'uiw.css',
          allChunks: true,
        } as any)
      ];
    }
  }

  return conf
}
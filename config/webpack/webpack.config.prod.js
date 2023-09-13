const path = require('path')
const glob = require('glob')
const os = require('os')
const { merge } = require('webpack-merge')
const common = require('./webpack.config.common.js')

const Dotenv = require('dotenv-webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, '../../src'),
}

module.exports = merge(common, {
  mode: 'production',

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },

  output: {
    filename: 'static/js/[name].[contenthash:8].js',
    path: path.resolve(__dirname, '../../dist'),
    publicPath: './',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
  },

  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '../env/.prod.env'),
    }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: 'bundle-stats.json',
    }),
    new CleanWebpackPlugin(),
    new CompressionPlugin({
      deleteOriginalAssets: true,
      algorithm: 'gzip',
      test: /\.(js|css|html)$/,
      threshold: 10240, // 압축을 적용할 파일 크기의 최소값 (10KB)
      minRatio: 0.8, // 압축률이 80% 이상일 경우에만 압축을 적용
    }),
    // PurgeCSSPlugin은 쓰는 css도 자꾸 날린다..
    // new PurgeCSSPlugin({
    //   paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    // }),
  ],

  optimization: {
    splitChunks: { chunks: 'all' },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 콘솔 로그를 제거한다
          },
        },
      }),
      new CssMinimizerPlugin({
        parallel: os.cpus().length - 1,
      }),
    ],
  },
})

import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
var fs = require('fs');

// Disable module transform when building for rollup
var babelRC = JSON.parse(fs.readFileSync('./.babelrc', { encoding: 'UTF-8'}))
babelRC.babelrc = false;
babelRC.presets[0][1].env.modules = false

var getPlugins = () => [
  resolve({
    extensions: ['.js', '.lsc']
  }),
  babel(babelRC)
]

var withFormat = (format) => ({
  input: 'src/index.lsc',
  output: {
    file: `lib/index.${format}.js`,
    format: format
  },
  sourcemap: 'inline',
  plugins: getPlugins()
})

export default [
  withFormat("cjs"),
  withFormat("es")
];

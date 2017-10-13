import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
var fs = require('fs');

var coverage = false;
if (process.env.COVERAGE === "true") coverage = true;

// Disable module transform when building for rollup
var babelRC = JSON.parse(fs.readFileSync('./.babelrc', { encoding: 'UTF-8'}))
babelRC.babelrc = false;
babelRC.presets[0][1].env.modules = false

if(coverage) {
  // Add Istanbul code coverage
  babelRC.presets[0][1].additionalPlugins = babelRC.presets[0][1].additionalPlugins || [];
  babelRC.presets[0][1].additionalPlugins.push("babel-plugin-istanbul");
}

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

// Only build CJS when doing coverage
var formats = [withFormat("cjs")];
if (!coverage) {
  formats.push(withFormat("es"));
}

export default formats;

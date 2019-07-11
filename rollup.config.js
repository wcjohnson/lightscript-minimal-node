import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
var path = require('path');

var srcPath = (path.resolve('./src')).replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
var srcPathRegex = new RegExp(srcPath)

// Load babelrc
var babelRC = require('./.babelrc.js')
babelRC.babelrc = false;
babelRC.extensions = [".js", ".lsc"];

// Locate LSC preset
var lscPreset = babelRC.presets.find(x => x[0] === "@lightscript")
if (!lscPreset) {
  throw new Error("Couldn't locate lightscript preset; aborting build")
}
var lscConfig = lscPreset[1]

// Istanbul code coverage
var coverage = (process.env.COVERAGE === "true");
if(coverage) {
  lscConfig.additionalPlugins = lscConfig.additionalPlugins || [];
  lscConfig.additionalPlugins.push("babel-plugin-istanbul");
}

// Attempt to determine if a module is external and should not be rolled into
// the bundle. Check for presence in source path, presence of "." in module path,
// or special module paths.
function isExternal(modulePath) {
  // "babelHelpers" must be treated as internal or babel-plugin-external-helpers will break
  if(/babelHelpers/.test(modulePath)) return false;

  // "." in module path = internal
  if(/\.\//.test(modulePath)) return false;

  // Otherwise, attempt to figure out whether the module is inside the source tree.
  modulePath = path.resolve(modulePath)
  return !(srcPathRegex.test(modulePath));
}

var getPlugins = () => [
  resolve({ extensions: babelRC.extensions }),
  babel(babelRC)
]

var formatForTarget = (target, format) => ({
  file: format === "cjs" ? `lib/${target}.js` : `lib/${target}.${format}.js`,
  format: format,
  sourcemap: true
})

function formatsForTarget(target) {
  var formats = [formatForTarget(target, "cjs")];
  if (!coverage) { formats.push(formatForTarget(target, "es")) }
  return formats;
}

var configForTarget = (target) => ({
  input: `src/${target}.lsc`,
  plugins: getPlugins(),
  external: isExternal,
  output: formatsForTarget(target)
})

export default [
  configForTarget('index'),
]

import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';

var path = require('path');
var findParentDir = require('find-parent-dir');

export default function createConfig(opts) {
  let { projectPath, targets, extensions, babelRuntime } = opts

  if(!extensions) { extensions = [".js", ".lsc"] }

  var srcPath = (path.resolve(projectPath, 'src')).replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
  var srcPathRegex = new RegExp(srcPath)

  // Find nearest babelrc
  var babelRCDir = findParentDir.sync(path.resolve(projectPath), 'babel.config.js')
  // XXX: consider lodash cloneDeep here
  const babelRC = JSON.parse(JSON.stringify(require(babelRCDir + '/babel.config.js')))
  babelRC.babelrc = false;
  babelRC.extensions = extensions;
  // XXX: disable TLA until lsc parser supports it
  babelRC.caller = {
    supportsTopLevelAwait: false
  }

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

  if(babelRuntime) {
    lscConfig.additionalPlugins = lscConfig.additionalPlugins || [];
    lscConfig.additionalPlugins.push("@babel/plugin-transform-runtime");
    babelRC.babelHelpers = 'runtime';
  } else {
    babelRC.babelHelpers = 'bundled';
  }

  console.log("Rollup config builder: compiling with babelrc:")
  console.dir(babelRC, { depth: 10 })

  // Attempt to determine if a module is external and should not be rolled into
  // the bundle. Check for presence in source path, presence of "." in module path,
  // or special module paths.
  function isExternal(modulePath) {
    // "babelHelpers" must be treated as internal or babel-plugin-external-helpers will break
    if(/babelHelpers/.test(modulePath)) return false;

    // "@babel/runtime" must be treated as external
    if(/@babel\/runtime/.test(modulePath)) return true;

    // "." in module path = internal
    if(/\.\//.test(modulePath)) return false;

    // Otherwise, attempt to figure out whether the module is inside the source tree.
    modulePath = path.resolve(modulePath)
    return !(srcPathRegex.test(modulePath));
  }

  function getPlugins(opts) {
    return [
      resolve({ extensions }),
      babel(babelRC)
    ]
  }

  var formatForTarget = (target, format) => ({
    file: format === "cjs" ? `lib/${target}.js` : `lib/${target}.${format}.js`,
    format: format,
    sourcemap: true
  })

  function formatsForTarget(opts) {
    var formats = [formatForTarget(opts.target, "cjs")];
    return formats;
  }

  var configForTarget = (opts) => ({
    input: `src/${opts.target}.lsc`,
    plugins: getPlugins(opts),
    external: isExternal,
    output: formatsForTarget(opts)
  })

  var targetConfigs = []

  for( const [key, value] of Object.entries(targets) ) {
    let targetOpts = Object.assign({}, value, { target: key })
    targetConfigs.push(configForTarget(targetOpts))
  }

  return targetConfigs
}

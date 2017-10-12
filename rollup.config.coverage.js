import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

var getPlugins = () => [
  resolve({
    extensions: ['.js', '.lsc']
  }),
  babel({
    "presets": [
      [
        "@oigroup/babel-preset-lightscript",
        {
          "env": {
            "targets": { "ie": 10 },
            "modules": false
          },
          "additionalPlugins": ["babel-plugin-istanbul"]
        }
      ]
    ]
  })
]

var withFormat = (format) => ({
  input: 'src/index.lsc',
  output: {
    file: `lib/index.${format}.js`,
    format: format
  },
  sourcemap: "inline",
  plugins: getPlugins()
})

export default [
  withFormat("cjs")
];

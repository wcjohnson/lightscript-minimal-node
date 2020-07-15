module.exports = {
  "moduleFileExtensions": [
    "js",
    "json",
    "lsc"
  ],
  "transform": {
    "\\.lsc$": ["babel-jest", { "rootMode": "upward" }]
  },
  "testRegex": "(\\.|/)test\\.lsc$",
  "coveragePathIgnorePatterns": [
    "/node_modules/"
  ]
}

module.exports = {
  "moduleFileExtensions": [
    "js",
    "json",
    "lsc"
  ],
  "transform": {
    "\\.lsc$": "<rootDir>/node_modules/babel-jest"
  },
  "testRegex": "(\\.|/)test\\.lsc$",
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "/lib/"
  ]
}

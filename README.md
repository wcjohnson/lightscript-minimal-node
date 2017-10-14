# lightscript-minimal-node

A minimal skeleton for a LightScript application or library running in Node.

# Features

- `rollup`-powered build with `@oigroup/babel-preset-lightscript`
- Linting with `@oigroup/lightscript-eslint`
- Testing with Jest; tests can be written in LightScript.
- Code coverage with source mapping
- GitHub syntax highlighting in `.gitattributes`

# VSCode

While [Visual Studio Code](https://code.visualstudio.com/) is not required to use this package, it has a lot of niceties for working on LightScript code, and comes highly recommended.

If you do use VSCode, installing the following extensions will greatly improve your experience:

- [LightScript syntax](https://marketplace.visualstudio.com/items?itemName=lightscript.lsc)
- [Babel ES2015+ syntax](https://marketplace.visualstudio.com/items?itemName=dzannotti.vscode-babel-coloring)
- [ESLint live linting](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

We also include some default workplace settings that will live-lint your code as you type in VSCode.

# Commands

## Building

```
npm run build
```

## Linting

```
npm run lint
```

## Testing

```
npm test
```

- To add tests, add files ending with `.test.lsc` anywhere underneath the `tests` folder.

## Coverage

```
npm run coverage
```

- Coverage reports are written to the `coverage` directory.

# Notes

- The rollup build assumes that `src/index.lsc` is your only entry/export point. If you need multiple entry points you will need to edit the `rollup.config.js`.

- The `package.json` is set to `private`; change that if you wish to publish to NPM.

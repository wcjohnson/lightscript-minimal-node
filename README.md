# lightscript-minimal-node

A minimal skeleton for a LightScript application or library running in Node.

Issues: https://github.com/wcjohnson/lightscript/issues

# Features

- Powered by Babel 7 and LightScript 4
- `rollup`-powered build with `@lightscript` babel preset
- Linting with `@lightscript/eslint-plugin`
- Testing with Jest; tests can be written in LightScript.
- Code coverage with source mapping
- GitHub syntax highlighting in `.gitattributes`
- `.editorconfig` for LightScript whitespace mode

# VSCode

While [Visual Studio Code](https://code.visualstudio.com/) is not required to use this package, it has a lot of niceties for working on LightScript code, and comes highly recommended.

If you do use VSCode, installing the following extensions will greatly improve your experience:

- [LightScript syntax](https://marketplace.visualstudio.com/items?itemName=lightscript.lsc)
- [ESLint live linting](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

We also include some default workplace settings that will live-lint your code as you type in VSCode.

## Debugging

The VSCode debugger can be used to debug LightScript with source mapping support. We have included a runtime configuration to demonstrate this option. Use `npm run test:debug` from the CLI, then launch the VS Code debugger and attach it to the process.

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

## Compiling with Babel

Use `npm run build:plain` to perform non-bundled builds with Babel instead of Rollup. You can also change the standard `build` script to call `build:plain` instead of `build:rollup`.

Please note that code coverage is not supported with plain builds at this time.

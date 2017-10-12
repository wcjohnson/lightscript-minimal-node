# lightscript-minimal-node

A minimal skeleton for a LightScript application or library running in Node.

# Features

- `rollup`-powered build with `@oigroup/babel-preset-lightscript`
- Linting with `@oigroup/lightscript-eslint`
- Testing with Jest; tests can be written in LightScript.
- GitHub syntax highlighting in `.gitattributes`

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

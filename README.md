# Simplified Node.js

> Simplified templates for creating Node.js projects

Templates include the following tools:

- 📝 [Changelogen](https://github.com/unjs/changelogen) for changelog and
  publishing automation
- ✨ Formatting and linting with [ESLint](https://eslint.org/) +
  [Prettier](https://prettier.io/)
- 🐶 [Husky](https://typicode.github.io/husky/) and
  [lint-staged](https://github.com/lint-staged/lint-staged) for maintaining code
  quality
- ⚙️ [TSX](https://tsx.is/) for running TypeScript during development
- 🏗️ Builds with [Unbuild](https://github.com/unjs/unbuild)
- 🧪 Testing with [Vitest](https://vitest.dev/)

## Templates

Templates can be installed using [giget](https://github.com/unjs/giget).

### Application

Standalone long-running applications not published to any registry:

```console
$ npx giget gh:simplified-js/node/app
```

### Library

Packages intended to be installed by other projects published to a registry:

```console
$ npx giget gh:simplified-js/node/lib
```

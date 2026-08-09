# luau-lsp-npm

Language Server Implementation for Luau.

You should prefer [rkkit](https://github.com/evilbocchi/rkkit) if you would rather use Rokit in NPM.

## Installation

```bash
npm install -g luau-lsp
```

Or install locally in your project:

```bash
npm install luau-lsp
```

## Usage

If installed globally, you can use Luau LSP commands directly:

```bash
luau-lsp init
luau-lsp serve
luau-lsp build
```

If installed locally, you can use it through npx:

```bash
npx luau-lsp init
npx luau-lsp serve
npx luau-lsp build
```

If you have a [rokit.toml](https://github.com/rojo-rbx/rokit) file, `npx rojo` will automatically use it.

## License

MIT. Note that I do not have any affiliation with the original Rojo project or its maintainers, and you
may want to check the original [Rojo license](http://github.com/rojo-rbx/rojo/).

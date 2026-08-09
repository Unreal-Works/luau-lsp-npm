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
luau-lsp analyze
luau-lsp lsp
luau-lsp require-graph
```

If installed locally, you can use it through npx:

```bash
npx luau-lsp analyze
npx luau-lsp lsp
npx luau-lsp require-graph
```

If you have a [rokit.toml](https://github.com/rojo-rbx/rokit) file, `npx luau-lsp` will automatically use it.

## License

MIT. Note that I do not have any affiliation with the original Luau LSP project or its maintainers, and you
may want to check the original [luau-lsp license](https://github.com/JohnnyMorganz/luau-lsp).

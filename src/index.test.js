import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const cliPath = fileURLToPath(new URL("./index.js", import.meta.url));
const projectRoot = path.dirname(cliPath);

const skip = process.env.LUAU_LSP_NPM_SKIP_CLI_TESTS === "1";

function runCli(args = [], options = {}) {
    return spawnSync(process.execPath, [cliPath, ...args], {
        cwd: options.cwd ?? projectRoot,
        encoding: "utf8",
        timeout: 120_000,
    });
}

function output(result) {
    return `${result.stdout ?? ""}${result.stderr ?? ""}`;
}

test("--version prints the installed luau-lsp version", { skip }, () => {
    const result = runCli(["--version"]);

    assert.equal(result.status, 0, output(result));
    assert.match(result.stdout, /^\d+\.\d+\.\d+\r?\n?$/);
});

test("rokit.toml configures the luau-lsp version", { skip }, () => {
    const dir = mkdtempSync(path.join(tmpdir(), "luau-lsp-npm-"));
    const configuredVersion = "1.69.0";
    try {
        writeFileSync(
            path.join(dir, "rokit.toml"),
            `[tools]\nluau-lsp = "JohnnyMorganz/luau-lsp@${configuredVersion}"\n`,
        );

        const result = runCli(["--version"], { cwd: dir });

        assert.equal(result.status, 0, output(result));
        assert.match(
            result.stdout,
            new RegExp(`^${configuredVersion.replaceAll(".", "\\.")}\\r?\\n?$`),
        );
    } finally {
        rmSync(dir, { recursive: true, force: true });
    }
});

test("--help prints the luau-lsp modes and options", { skip }, () => {
    const result = runCli(["--help"]);

    assert.equal(result.status, 0, output(result));
    for (const mode of ["analyze", "lsp", "require-graph"]) {
        assert.match(output(result), new RegExp(`\\b${mode}\\b`));
    }
    assert.match(output(result), /--show-flags/);
});

test("--show-flags displays available Luau flags", { skip }, () => {
    const result = runCli(["--show-flags"]);

    assert.equal(result.status, 0, output(result));
    assert.notEqual(result.stdout.trim(), "");
});

test("running with no mode reports the available modes", { skip }, () => {
    const result = runCli([]);

    assert.equal(result.status, 1, output(result));
    assert.match(output(result), /Specify a particular mode/);
    assert.match(output(result), /Usage: luau-lsp/);
});

test("an unknown mode exits with a non-zero code", { skip }, () => {
    const result = runCli(["definitely-not-a-command"]);

    assert.equal(result.status, 1, output(result));
    assert.match(output(result), /Failed to parse/);
});

test("analyze without input reports a Luau error", { skip }, () => {
    const result = runCli(["analyze"]);

    assert.notEqual(result.status, 0, output(result));
    assert.match(output(result), /error/i);
});

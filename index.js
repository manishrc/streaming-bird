#!/usr/bin/env node

"use strict";
const meow = require("meow");
const path = require("path");
const split = require("split2");
const through = require("through2");
const pumpify = require("pumpify");
const R = require("ramda");
const fs = require("fs");

const cli = meow(
  `
$ streaming-bird --help

  Usage
    $ streaming-bird [-i <file>] [-o <file>] <nodejs-script> ...

  Options
    -i, --input       Read from a <file>
    -o, --output      Write output to <file>
    -l, --lines       Line mode ON (DEFAULT)
    --no-lines        Disable line mode
    --json            Parse JSON
  
  Examples
    $ streaming-bird -i huge-file.jsonl -o output.jsonl transformer-a.js
    $ cat huge-file.jsonl | streaming-bird transformer.js > output.jsonl
`,
  {
    flags: {
      lines: { type: "boolean", alias: "l", default: true },
      input: { type: "string", alias: "i" },
      output: { type: "string", alias: "o" },
      json: { type: "boolean", alias: "j" }
    }
  }
);

const composeTransform = fn =>
  through.obj(function(chunk, encoding, callback) {
    let result = fn(chunk);

    if (typeof result == "object") {
      try {
        result = JSON.stringify(result);
      } catch (e) {
        console.error(e);
      }
    }
    if (["number", "boolean"].indexOf(typeof result) != -1)
      result = String(result);

    this.push(result);
    if (cli.flags.lines) this.push("\n");
    callback();
  });

const scripts = cli.input.map(rp => path.resolve(rp)).map(ap => require(ap));

if (cli.flags.json) scripts.unshift(JSON.parse);

const pipeline = [composeTransform(R.pipe(...scripts))];

const inputStream = !!cli.flags.input
  ? fs.createReadStream(cli.flags.input)
  : process.stdin;

const outputStream = !!cli.flags.output
  ? fs.createWriteStream(cli.flags.output)
  : process.stdout;

if (cli.flags.lines) pipeline.unshift(split());

inputStream.pipe(pumpify(...pipeline, outputStream));

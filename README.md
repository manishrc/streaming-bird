# 🐧 streaming-bird

CLI wrapper for node scripts to work with Unix pipes and streams.

## Install
```
$ npm install --global streaming-bird
```

## Usage
```
$ streaming-bird --help

  Usage
    $ streaming-bird [-i <file>] [-o <file>] node_scripts ...

  Options
    -i, --input       Read from a <file>
    -o, --output      Write output to <file>
    -l, --lines       Line mode ON (DEFAULT)
    --no-lines        Disable line mode
  
  Examples
    $ streaming-bird -i huge-file.jsonl -o output.jsonl transformer-a.js
    $ cat huge-file.jsonl | streaming-bird transformer.js > output.jsonl
```
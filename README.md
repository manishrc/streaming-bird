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
```

## Examples

### `example-input.jsonl`

```json
{"name": "Nickolas Swaniawski"}
{"name": "Drake Bednar"}
{"name": "Abbie Runte"}
{"name": "Jessica Schmeler"}
{"name": "Pearl Fay"}
{"name": "Everett Shanahan"}
```

### `example-transformer-upcase.js`

```js
module.exports = ({ name }) => {
  return { name: name.toUpperCase() };
};
```

### `example-transformer-length.js`

```js
module.exports = ({ name }) => {
  return { name, length: name.length };
};
```

### CLI

```
$ cat example-input.jsonl \
| streaming-bird example-transformer-upcase.js example-transformer-length.js \
| sort > out.jsonl
```

Or

```
$ streaming-bird example-transformer-upcase.js example-transformer-length.js \
-i example-input.jsonl \
-o out.jsonl
```

### `out.jsonl`

```json
{"name":"ABBIE RUNTE","length":11}
{"name":"DRAKE BEDNAR","length":12}
{"name":"EVERETT SHANAHAN","length":16}
{"name":"JESSICA SCHMELER","length":16}
{"name":"NICKOLAS SWANIAWSKI","length":19}
{"name":"PEARL FAY","length":9}
```

**NOTE**  
The scripts are piped left-to-right. The result of the first script is passed on as the input of the second without serializing.

To work with serialized objects, parsing needs to happen only in the first script.

The result of the last script is serealized.

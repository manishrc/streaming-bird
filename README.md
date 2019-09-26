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

### `example-transformer.jsonl`
```js
module.exports = personJson => {
  const {name} = JSON.parse(personJson);
  return { name: name.toUpperCase(), length: name.length};
};
```

### CLI
```
$ cat example-input.jsonl | streaming-bird example-transformer.jsonl | sort > out.jsonl
```

Or

```
$ streaming-bird example-transformer.jsonl -i example-input.jsonl -o out.jsonl
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
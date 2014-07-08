# validation-stream

Object validation stream for schemata schemas

[![build status](https://secure.travis-ci.org/domharrington/validation-stream.png)](http://travis-ci.org/domharrington/validation-stream)

## Installation

```
npm install validation-stream --save
```

## Usage

```js
var validity = require('validity')
  , schemata = require('schemata')
  , schema = schemata({ name: { validators: { all: [ validity.required ] } } })
  , ValidationStream = require('validation-stream')
  , stream = new ValidationStream({ schema: schema })

stream.on('error', function (error) {
  console.log('Error in validation', error);
})

stream.on('data', function (data) {
  console.log('Item validated successfully', data);
})

stream.on('finish', function () {
  console.log('All objects validated');
})

stream.write({ name: 'test name' }) // valid object
stream.write({}) // invalid object
stream.end()

```

### `var stream = ValidationStream(options)`

Options must include:

- `schema` - a schemata schema with a `validate` function

Options can include:

- `haltOnError` - whether to emit `error` on validation error (and stop processing).
Defaults to `false`. If true, it emits a `validationError` for each validation error

## Credits
[Dom Harrington](https://github.com/domharrington/)

[Tom Gallacher](https://github.com/tomgco/)

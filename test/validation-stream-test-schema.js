var schemata = require('schemata')
  , validity = require('validity')
  , schema = schemata({ name: { validators: { all: [ validity.required ] } } })

module.exports = schema

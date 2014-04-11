var validity = require('validity')
  , schemata = require('schemata')
  , schema = schemata({ name: { validators: { all: [ validity.required ] } } })
  , ValidationStream = require('./')
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

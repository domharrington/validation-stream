var ValidationStream = require('../')
  , schema = require('./validation-stream-test-schema')
  , assert = require('assert')

describe('validation stream', function () {

  it('should throw if no connection provided', function () {
    assert.throws(function () {
      var test = new ValidationStream()
      test.end()
    }, /`options.schema` is required/)
  })

  it('should set the schema property to the schema provided', function () {
    var stream = new ValidationStream({ schema: schema })
    assert.equal(stream.schema, schema)
  })

  it('should succeed with no errors', function (done) {
    var stream = new ValidationStream({ schema: schema })
      , called = false

    stream.on('error', function () { called = true })
    stream.on('finish', function () {
      assert(!called, 'Error should not be called')
      done()
    })

    stream.write({ name: 'test name' })
    stream.end()
  })

  it('should emit an `error` if errors are encountered', function (done) {
    var stream = new ValidationStream({ schema: schema })
      , called = false

    stream.on('error', function (err) {
      assert.equal(err.name, 'Name is required')
      called = true
    })
    stream.on('finish', function () {
      assert(called, 'Error should be called')
      done()
    })

    stream.write({})
    stream.end()
  })

})

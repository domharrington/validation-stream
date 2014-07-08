module.exports = ValidationStream

var Transform = require('stream').Transform
  , extend = require('lodash.assign')

function ValidationStream(options) {
  options = options || {}
  if (!options.schema) throw new Error('`options.schema` is required')

  options.haltOnError = typeof options.haltOnError === 'undefined' ? true : options.haltOnError

  Transform.call(this, extend({ objectMode: true }, options))

  this.schema = options.schema
  this.haltOnError = options.haltOnError
}

ValidationStream.prototype = Object.create(Transform.prototype)

ValidationStream.prototype._transform = function (chunk, encoding, done) {
  this.schema.validate(chunk, function (err, errors) {
    if (err) return done(err)
    if (Object.keys(errors).length > 0) {
      if (this.haltOnError === true) return done(errors)

      this.emit('validationError', { object: chunk, errors: errors })
      return done(null)
    }

    this.push(chunk)
    done(null)
  }.bind(this))

}

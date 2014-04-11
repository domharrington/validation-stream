module.exports = ValidationStream

var Transform = require('stream').Transform
  , extend = require('lodash.assign')

function ValidationStream(options) {
  options = options || {}
  if (!options.schema) throw new Error('`options.schema` is required')

  Transform.call(this, extend({ objectMode: true }, options))

  this.schema = options.schema
}

ValidationStream.prototype = Object.create(Transform.prototype)

ValidationStream.prototype._transform = function (chunk, encoding, done) {
  this.schema.validate(chunk, function (err, errors) {
    if (err) return done(err)
    if (Object.keys(errors).length > 0) return done(errors)

    this.push(chunk)
    done(null)
  }.bind(this))

}

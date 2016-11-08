'use strict'

var utils = require('lazy-cache')(require)
var fn = require
require = utils // eslint-disable-line no-undef, no-native-reassign, no-global-assign

/**
 * Lazily required module dependencies
 */

require('define-property', 'define')
require('isobject', 'isObject')
require('minibase-create-plugin', 'createPlugin')
require = fn // eslint-disable-line no-undef, no-native-reassign, no-global-assign

utils.registerMethod = function registerMethod (self, name) {
  var plugin = self.registered[self._pluginName]
  self.registered[self._pluginName] = Array.isArray(plugin) ? plugin : []
  self.registered[self._pluginName].push(name)
  return self
}

utils.emitWhenCalled = function emitWhenCalled (self, name, fn) {
  return function fnWrapper () {
    var args = [].slice.call(arguments)
    self.emit.apply(self, [name, fn].concat(args))
    return fn.apply(self, args)
  }
}

/**
 * Expose `utils` modules
 */

module.exports = utils

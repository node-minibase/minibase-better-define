/*!
 * minibase-better-define <https://github.com/node-minibase/minibase-better-define>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var utils = require('./utils')

module.exports = function minibaseBetterDefine (opts) {
  return function minibaseBetterDefine (self) {
    self.use(utils.isRegistered())

    /* istanbul ignore next */
    if (self.isRegistered('better-define')) return

    self.define('define', function define (key, value, props) {
      if (typeof key === 'string') {
        if (typeof value === 'function') {
          utils.registerMethod(self, key)
          value = utils.emitWhenCalled(self, key, value)
        }
        utils.define(self, key, value)
        return self
      }
      utils.define(key, value, props)
      return self
    })
  }
}

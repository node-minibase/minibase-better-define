/*!
 * minibase-better-define <https://github.com/node-minibase/minibase-better-define>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var utils = require('./utils')

/**
 * > Overrides core `.define` method of your application. That
 * `opts` option is optional and does nothing. It is just convention
 * each plugin to export function that returns a plugin.
 *
 * **Example**
 *
 * ```js
 * var betterDefine = require('minibase-better-define')
 *
 * var MiniBase = require('minibase').MiniBase
 * var app = new MiniBase()
 * app.use(betterDefine())
 *
 * // or as Base plugin
 *
 * var Base = require('base')
 * var base = new Base()
 * base.use(betterDefine())
 * ```
 *
 * @param  {Object} `opts` optional, no options currently
 * @return {Function} plugin that can be pass to [base][]/[minibase][]'s `.use` method
 * @api public
 */

module.exports = function minibaseBetterDefine (opts) {
  return utils.createPlugin('better-define', function betterDefine (self) {
    /**
     * > Defines a non-enumerable property to application instance
     * if first argument `key` is not an object, but string.
     * If `key` is object, it works like [define-property][] lib.
     *
     * **It also gives you few more things:**
     *
     * **1)** if `value` is function it emits
     * `key` event when that method is called and with arguments - that
     * function and passed arguments to that function.
     * **2)** adds that method's name to `app.registered[pluginName]`
     * where plugin name is the string passed to `.isRegistered` method
     * if exists and is used.
     *
     * **Example**
     *
     * ```js
     * app.use(betterDefine())
     *
     * app.define('foobar', function (a, b) {
     *   return a + b
     * })
     *
     * app.on('foobar', function listener (fn, arg1, arg2) {
     *   console.log(fn) // => the `foobar` method function
     *   console.log(arg1) // => 111
     *   console.log(arg2) // => 222
     * })
     *
     * console.log(app.foobar(111, 222)) // => 333
     *
     * // or use it as normal `define-property`
     * var obj = {}
     * app.define(obj, 'foo', 123)
     * app.define(obj, 'qux', 'bar')
     * app.define(obj, 'aaa', function aaa () {})
     *
     * console.log(obj.foo) // => 123
     * console.log(obj.qux) // => 'bar'
     * console.log(obj.aaa) // => Function: aaa
     * ```
     *
     * @name   .define
     * @param  {String|Object} `key` name of the property; if object works as [define-property][]
     * @param  {any} `value` any javascript value; if function it emits event with `key` name
     * @param  {Object} `props` works as third argument of [define-property][]
     * @return {Object} instance of [minibase][] for chaining,
     *                  or [base][] instance if used as Base plugin
     * @api public
     */

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
  })
}

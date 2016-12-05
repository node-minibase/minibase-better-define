/*!
 * minibase-better-define <https://github.com/node-minibase/minibase-better-define>
 *
 * Copyright (c) Charlike Mike Reagent <@tunnckoCore> (http://i.am.charlike.online)
 * Released under the MIT license.
 */

/* jshint asi:true */

'use strict'

var test = require('mukla')
var betterDefine = require('./index')
var MiniBase = require('minibase').MiniBase
var isRegistered = require('minibase-is-registered')

test('should work as normal define-property if first arg is object', function (done) {
  var app = new MiniBase()
  app.use(betterDefine())
  app.use(function (self) {
    var obj = {}
    self.define(obj, 'foo', 'bar')
    self.define(obj, 'qux', 123)
    test.strictEqual(obj.foo, 'bar')
    test.strictEqual(obj.qux, 123)
  })
  done()
})

test('should not emit events if used as define-property whn first arg is object', function (done) {
  var minibase = new MiniBase()
  minibase.use(betterDefine())
  minibase.use(function (self) {
    var obj = {}
    var called = false
    self.on('foobar', function () {
      called = true
    })
    self.define(obj, 'foobar', function abc () {
      obj.called = 1
    })
    test.strictEqual(typeof obj.foobar, 'function')
    obj.foobar()
    test.strictEqual(called, false)
  })
  done()
})

test('should emit event with method name when define method on instance', function (done) {
  var base = new MiniBase()
  base.use(betterDefine())
  base.use(function (self) {
    self.on('barqux', function (fn, a, b) {
      test.strictEqual(a, 1)
      test.strictEqual(b, 2)
      test.strictEqual(typeof fn, 'function')
      test.strictEqual(fn(1, 2), 3)
    })
    self.define('barqux', function (a, b) {
      return a + b
    })
    self.barqux(1, 2)
  })
  done()
})

test('should add method names `.define`d on app.registered[methodName] array', function (done) {
  var mini = new MiniBase()
  var called = 0

  mini.use(betterDefine())
  mini.use(isRegistered())
  mini.use(function (self) {
    if (self.isRegistered('foo-plugin')) return
    self.define('aaa', function () {
      return 123
    })
    self.define('bbb', function () {
      return 456
    })
  })
  test.ok(mini.registered['foo-plugin'])

  var methods = mini.registered['foo-plugin']
  test.strictEqual(methods[0], 'aaa')
  test.strictEqual(methods[1], 'bbb')

  mini.on('aaa', function () {
    called++
  })
  mini.on('bbb', function () {
    called++
  })

  mini.aaa()
  mini.bbb()
  test.strictEqual(called, 2)
  done()
})

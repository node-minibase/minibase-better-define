# [minibase-better-define][author-www-url] [![npmjs.com][npmjs-img]][npmjs-url] [![The MIT License][license-img]][license-url] [![npm downloads][downloads-img]][downloads-url] 

> wip

[![code climate][codeclimate-img]][codeclimate-url] [![standard code style][standard-img]][standard-url] [![travis build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![dependency status][david-img]][david-url]

## Install
> Install with [npm](https://www.npmjs.com/)

```sh
$ npm i minibase-better-define --save
```

## Usage
> For more use-cases see the [tests](./test.js)

```js
const minibaseBetterDefine = require('minibase-better-define')
```

## API

### [minibaseBetterDefine](index.js#L38)
> Overrides core `.define` method of your application. That `opts` option is optional and does nothing. It is just convention each plugin to export function that returns a plugin.

**Params**

* `opts` **{Object}**: optional, no options currently    
* `returns` **{Function}**: plugin that can be pass to [base][]/[minibase][]'s `.use` method  

**Example**

```js
var betterDefine = require('minibase-better-define')

var MiniBase = require('minibase').MiniBase
var app = new MiniBase()
app.use(betterDefine())

// or as Base plugin

var Base = require('base')
var base = new Base()
base.use(betterDefine())
```

### [.define](index.js#L96)
> Defines a non-enumerable property to application instance if first argument `key` is not an object, but string. If `key` is object, it works like [define-property][] lib.

**It also gives you few more things:**
**1)** if `value` is function it emits
`key` event when that method is called and with arguments - that
function and passed arguments to that function.
**2)** adds that method's name to `app.registered[pluginName]`
where plugin name is the string passed to `.isRegistered` method
if exists and is used.

**Params**

* `key` **{String|Object}**: name of the property; if object works as [define-property][]    
* `value` **{any}**: any javascript value; if function it emits event with `key` name    
* `props` **{Object}**: works as third argument of [define-property][]    
* `returns` **{Object}**: instance of [minibase][] for chaining, or [base][] instance if used as Base plugin  

**Example**

```js
app.use(betterDefine())

app.define('foobar', function (a, b) {
  return a + b
})

app.on('foobar', function listener (fn, arg1, arg2) {
  console.log(fn) // => the `foobar` method function
  console.log(arg1) // => 111
  console.log(arg2) // => 222
})

console.log(app.foobar(111, 222)) // => 333

// or use it as normal `define-property`
var obj = {}
app.define(obj, 'foo', 123)
app.define(obj, 'qux', 'bar')
app.define(obj, 'aaa', function aaa () {})

console.log(obj.foo) // => 123
console.log(obj.qux) // => 'bar'
console.log(obj.aaa) // => Function: aaa
```

## Related
- [always-done](https://www.npmjs.com/package/always-done): Handle completion and errors with elegance! Support for streams, callbacks, promises, child processes, async/await and sync functions. A drop-in replacement for [async-done][] - pass 100… [more](https://github.com/hybridables/always-done#readme) | [homepage](https://github.com/hybridables/always-done#readme "Handle completion and errors with elegance! Support for streams, callbacks, promises, child processes, async/await and sync functions. A drop-in replacement for [async-done][] - pass 100% of its tests plus more")
- [minibase-assert](https://www.npmjs.com/package/minibase-assert): Plugin for [minibase][] and [base][], that adds assertion methods - most of [assert-kindof][] methods and built-ins assert module. | [homepage](https://github.com/node-minibase/minibase-assert#readme "Plugin for [minibase][] and [base][], that adds assertion methods - most of [assert-kindof][] methods and built-ins assert module.")
- [minibase-is-registered](https://www.npmjs.com/package/minibase-is-registered): Plugin for [minibase][] and [base][], that adds `isRegistered` method to your application to detect if plugin is already registered and returns true or false if… [more](https://github.com/node-minibase/minibase-is-registered#readme) | [homepage](https://github.com/node-minibase/minibase-is-registered#readme "Plugin for [minibase][] and [base][], that adds `isRegistered` method to your application to detect if plugin is already registered and returns true or false if named plugin is already registered on the instance.")
- [minibase-visit](https://www.npmjs.com/package/minibase-visit): Plugin for [minibase][] and [base][], that adds `.visit` method to your application to visit a method over the items in an object, or map visit… [more](https://github.com/node-minibase/minibase-visit#readme) | [homepage](https://github.com/node-minibase/minibase-visit#readme "Plugin for [minibase][] and [base][], that adds `.visit` method to your application to visit a method over the items in an object, or map visit over the objects in an array. Using using [collection-visit][] package.")
- [minibase](https://www.npmjs.com/package/minibase): MiniBase is minimalist approach to Base - @node-base, the awesome framework. Foundation for building complex APIs with small units called plugins. Works well with most… [more](https://github.com/node-minibase/minibase#readme) | [homepage](https://github.com/node-minibase/minibase#readme "MiniBase is minimalist approach to Base - @node-base, the awesome framework. Foundation for building complex APIs with small units called plugins. Works well with most of the already existing [base][] plugins.")
- [mukla](https://www.npmjs.com/package/mukla): Small, parallel and fast test framework with suppport for async/await, promises, callbacks, streams and observables. Targets and works at node.js v0.10 and above. | [homepage](https://github.com/tunnckocore/mukla#readme "Small, parallel and fast test framework with suppport for async/await, promises, callbacks, streams and observables. Targets and works at node.js v0.10 and above.")
- [try-catch-core](https://www.npmjs.com/package/try-catch-core): Low-level package to handle completion and errors of sync or asynchronous functions, using [once][] and [dezalgo][] libs. Useful for and used in higher-level libs such… [more](https://github.com/hybridables/try-catch-core#readme) | [homepage](https://github.com/hybridables/try-catch-core#readme "Low-level package to handle completion and errors of sync or asynchronous functions, using [once][] and [dezalgo][] libs. Useful for and used in higher-level libs such as [always-done][] to handle completion of anything.")

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/node-minibase/minibase-better-define/issues/new).  
But before doing anything, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) guidelines.

## [Charlike Make Reagent](http://j.mp/1stW47C) [![new message to charlike][new-message-img]][new-message-url] [![freenode #charlike][freenode-img]][freenode-url]

[![tunnckoCore.tk][author-www-img]][author-www-url] [![keybase tunnckoCore][keybase-img]][keybase-url] [![tunnckoCore npm][author-npm-img]][author-npm-url] [![tunnckoCore twitter][author-twitter-img]][author-twitter-url] [![tunnckoCore github][author-github-img]][author-github-url]

[base]: https://github.com/node-base/base
[define-property]: https://github.com/jonschlinkert/define-property
[minibase]: https://github.com/node-minibase/minibase

[npmjs-url]: https://www.npmjs.com/package/minibase-better-define
[npmjs-img]: https://img.shields.io/npm/v/minibase-better-define.svg?label=minibase-better-define

[license-url]: https://github.com/node-minibase/minibase-better-define/blob/master/LICENSE
[license-img]: https://img.shields.io/npm/l/minibase-better-define.svg

[downloads-url]: https://www.npmjs.com/package/minibase-better-define
[downloads-img]: https://img.shields.io/npm/dm/minibase-better-define.svg

[codeclimate-url]: https://codeclimate.com/github/node-minibase/minibase-better-define
[codeclimate-img]: https://img.shields.io/codeclimate/github/node-minibase/minibase-better-define.svg

[travis-url]: https://travis-ci.org/node-minibase/minibase-better-define
[travis-img]: https://img.shields.io/travis/node-minibase/minibase-better-define/master.svg

[coveralls-url]: https://coveralls.io/r/node-minibase/minibase-better-define
[coveralls-img]: https://img.shields.io/coveralls/node-minibase/minibase-better-define.svg

[david-url]: https://david-dm.org/node-minibase/minibase-better-define
[david-img]: https://img.shields.io/david/node-minibase/minibase-better-define.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg

[author-www-url]: http://www.tunnckocore.tk
[author-www-img]: https://img.shields.io/badge/www-tunnckocore.tk-fe7d37.svg

[keybase-url]: https://keybase.io/tunnckocore
[keybase-img]: https://img.shields.io/badge/keybase-tunnckocore-8a7967.svg

[author-npm-url]: https://www.npmjs.com/~tunnckocore
[author-npm-img]: https://img.shields.io/badge/npm-~tunnckocore-cb3837.svg

[author-twitter-url]: https://twitter.com/tunnckoCore
[author-twitter-img]: https://img.shields.io/badge/twitter-@tunnckoCore-55acee.svg

[author-github-url]: https://github.com/tunnckoCore
[author-github-img]: https://img.shields.io/badge/github-@tunnckoCore-4183c4.svg

[freenode-url]: http://webchat.freenode.net/?channels=charlike
[freenode-img]: https://img.shields.io/badge/freenode-%23charlike-5654a4.svg

[new-message-url]: https://github.com/tunnckoCore/ama
[new-message-img]: https://img.shields.io/badge/ask%20me-anything-green.svg

[always-done]: https://github.com/hybridables/always-done
[assert-kindof]: https://github.com/tunnckocore/assert-kindof
[async-done]: https://github.com/gulpjs/async-done
[collection-visit]: https://github.com/jonschlinkert/collection-visit
[dezalgo]: https://github.com/npm/dezalgo
[once]: https://github.com/isaacs/once
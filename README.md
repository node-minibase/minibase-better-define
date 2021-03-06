<p align="center">
  <a href="https://github.com/node-minibase">
    <img height="250" width="250" src="https://avatars1.githubusercontent.com/u/23032863?v=3&s=250">
  </a>
</p>

# minibase-better-define [![NPM version](https://img.shields.io/npm/v/minibase-better-define.svg?style=flat)](https://www.npmjs.com/package/minibase-better-define) [![NPM downloads](https://img.shields.io/npm/dm/minibase-better-define.svg?style=flat)](https://npmjs.org/package/minibase-better-define) [![npm total downloads][downloads-img]][downloads-url]

> Plugin for [base][] and [minibase][] that overrides the core `.define` method to be more better.

[![code climate][codeclimate-img]][codeclimate-url] 
[![standard code style][standard-img]][standard-url] 
[![linux build status][travis-img]][travis-url] 
[![windows build status][appveyor-img]][appveyor-url] 
[![coverage status][coveralls-img]][coveralls-url] 
[![dependency status][david-img]][david-url]

## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [API](#api)
  * [minibaseBetterDefine](#minibasebetterdefine)
  * [.define](#define)
- [Related](#related)
- [Contributing](#contributing)
- [Building docs](#building-docs)
- [Running tests](#running-tests)
- [Author](#author)
- [License](#license)

_(TOC generated by [verb](https://github.com/verbose/verb) using [markdown-toc](https://github.com/jonschlinkert/markdown-toc))_

## Install
Install with [npm](https://www.npmjs.com/)

```
$ npm install minibase-better-define --save
```

or install using [yarn](https://yarnpkg.com)

```
$ yarn add minibase-better-define
```

## Usage
> For more use-cases see the [tests](test.js)

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

### [.define](index.js#L91)
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
- [always-done](https://www.npmjs.com/package/always-done): Handle completion and errors with elegance! Support for streams, callbacks, promises, child processes, async/await and sync… [more](https://github.com/hybridables/always-done#readme) | [homepage](https://github.com/hybridables/always-done#readme "Handle completion and errors with elegance! Support for streams, callbacks, promises, child processes, async/await and sync functions. A drop-in replacement for [async-done][] - pass 100% of its tests plus more")
- [minibase-assert](https://www.npmjs.com/package/minibase-assert): Plugin for [minibase][] and [base][], that adds assertion methods - most of [assert-kindof][] methods and built-ins… [more](https://github.com/node-minibase/minibase-assert#readme) | [homepage](https://github.com/node-minibase/minibase-assert#readme "Plugin for [minibase][] and [base][], that adds assertion methods - most of [assert-kindof][] methods and built-ins assert module.")
- [minibase-create-plugin](https://www.npmjs.com/package/minibase-create-plugin): Utility for [minibase][] and [base][] that helps you create plugins | [homepage](https://github.com/node-minibase/minibase-create-plugin#readme "Utility for [minibase][] and [base][] that helps you create plugins")
- [minibase-is-registered](https://www.npmjs.com/package/minibase-is-registered): Plugin for [minibase][] and [base][], that adds `isRegistered` method to your application to detect if plugin… [more](https://github.com/node-minibase/minibase-is-registered#readme) | [homepage](https://github.com/node-minibase/minibase-is-registered#readme "Plugin for [minibase][] and [base][], that adds `isRegistered` method to your application to detect if plugin is already registered and returns true or false if named plugin is already registered on the instance.")
- [minibase-tests](https://www.npmjs.com/package/minibase-tests): Tests for applications built on [minibase][] or [base][]. All Base apps passes these tests. | [homepage](https://github.com/node-minibase/minibase-tests#readme "Tests for applications built on [minibase][] or [base][]. All Base apps passes these tests.")
- [minibase-visit](https://www.npmjs.com/package/minibase-visit): Plugin for [minibase][] and [base][], that adds `.visit` method to your application to visit a method… [more](https://github.com/node-minibase/minibase-visit#readme) | [homepage](https://github.com/node-minibase/minibase-visit#readme "Plugin for [minibase][] and [base][], that adds `.visit` method to your application to visit a method over the items in an object, or map visit over the objects in an array. Using using [collection-visit][] package.")
- [minibase](https://www.npmjs.com/package/minibase): Minimalist alternative for Base. Build complex APIs with small units called plugins. Works well with most… [more](https://github.com/node-minibase/minibase#readme) | [homepage](https://github.com/node-minibase/minibase#readme "Minimalist alternative for Base. Build complex APIs with small units called plugins. Works well with most of the already existing [base][] plugins.")
- [mukla](https://www.npmjs.com/package/mukla): Small, parallel and fast test framework with suppport for async/await, promises, callbacks, streams and observables. Targets… [more](https://github.com/tunnckocore/mukla#readme) | [homepage](https://github.com/tunnckocore/mukla#readme "Small, parallel and fast test framework with suppport for async/await, promises, callbacks, streams and observables. Targets and works at node.js v0.10 and above.")
- [try-catch-core](https://www.npmjs.com/package/try-catch-core): Low-level package to handle completion and errors of sync or asynchronous functions, using [once][] and [dezalgo… [more](https://github.com/hybridables/try-catch-core#readme) | [homepage](https://github.com/hybridables/try-catch-core#readme "Low-level package to handle completion and errors of sync or asynchronous functions, using [once][] and [dezalgo][] libs. Useful for and used in higher-level libs such as [always-done][] to handle completion of anything.")

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/node-minibase/minibase-better-define/issues/new).  
Please read the [contributing guidelines](CONTRIBUTING.md) for advice on opening issues, pull requests, and coding standards.  
If you need some help and can spent some cash, feel free to [contact me at CodeMentor.io](https://www.codementor.io/tunnckocore?utm_source=github&utm_medium=button&utm_term=tunnckocore&utm_campaign=github) too.

**In short:** If you want to contribute to that project, please follow these things

1. Please DO NOT edit [README.md](README.md), [CHANGELOG.md](CHANGELOG.md) and [.verb.md](.verb.md) files. See ["Building docs"](#building-docs) section.
2. Ensure anything is okey by installing the dependencies and run the tests. See ["Running tests"](#running-tests) section.
3. Always use `npm run commit` to commit changes instead of `git commit`, because it is interactive and user-friendly. It uses [commitizen][] behind the scenes, which follows Conventional Changelog idealogy.
4. Do NOT bump the version in package.json. For that we use `npm run release`, which is [standard-version][] and follows Conventional Changelog idealogy.

Thanks a lot! :)

## Building docs
Documentation and that readme is generated using [verb-generate-readme][], which is a [verb][] generator, so you need to install both of them and then run `verb` command like that

```
$ npm install verbose/verb#dev verb-generate-readme --global && verb
```

_Please don't edit the README directly. Any changes to the readme must be made in [.verb.md](.verb.md)._

## Running tests
Clone repository and run the following in that cloned directory

```
$ npm install && npm test
```

## Author
**Charlike Mike Reagent**

+ [github/tunnckoCore](https://github.com/tunnckoCore)
+ [twitter/tunnckoCore](http://twitter.com/tunnckoCore)
+ [codementor/tunnckoCore](https://codementor.io/tunnckoCore)

## License
Copyright © 2016, [Charlike Mike Reagent](http://i.am.charlike.online). Released under the [MIT license](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.2.0, on December 05, 2016._

[always-done]: https://github.com/hybridables/always-done
[assert-kindof]: https://github.com/tunnckocore/assert-kindof
[async-done]: https://github.com/gulpjs/async-done
[base]: https://github.com/node-base/base
[collection-visit]: https://github.com/jonschlinkert/collection-visit
[commitizen]: https://github.com/commitizen/cz-cli
[define-property]: https://github.com/jonschlinkert/define-property
[dezalgo]: https://github.com/npm/dezalgo
[minibase]: https://github.com/node-minibase/minibase
[once]: https://github.com/isaacs/once
[standard-version]: https://github.com/conventional-changelog/standard-version
[verb-generate-readme]: https://github.com/verbose/verb-generate-readme
[verb]: https://github.com/verbose/verb

[downloads-url]: https://www.npmjs.com/package/minibase-better-define
[downloads-img]: https://img.shields.io/npm/dt/minibase-better-define.svg

[codeclimate-url]: https://codeclimate.com/github/node-minibase/minibase-better-define
[codeclimate-img]: https://img.shields.io/codeclimate/github/node-minibase/minibase-better-define.svg

[travis-url]: https://travis-ci.org/node-minibase/minibase-better-define
[travis-img]: https://img.shields.io/travis/node-minibase/minibase-better-define/master.svg?label=linux

[appveyor-url]: https://ci.appveyor.com/project/tunnckoCore/minibase-better-define
[appveyor-img]: https://img.shields.io/appveyor/ci/tunnckoCore/minibase-better-define/master.svg?label=windows

[coveralls-url]: https://coveralls.io/r/node-minibase/minibase-better-define
[coveralls-img]: https://img.shields.io/coveralls/node-minibase/minibase-better-define.svg

[david-url]: https://david-dm.org/node-minibase/minibase-better-define
[david-img]: https://img.shields.io/david/node-minibase/minibase-better-define.svg

[standard-url]: https://github.com/feross/standard
[standard-img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg


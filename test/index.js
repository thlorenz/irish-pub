'use strict';
/*jshint asi: true */

var test = require('tap').test
  , irishPub = require('../')
  , fs = require('fs')

function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true));
}

test('\nfoo with .gitignore and no .npmignore', function (t) {
  var entries = []

  irishPub(__dirname + '/foo')
    .on('error', t.fail.bind(t))
    .on('data', function (d) { entries.push(d.toString()) })
    .on('end', function () {
      t.deepEqual(
          entries
        , [ 'package.json\n',
            '.npmignore\n',
            'index.js\n',
            'example/first.js\n',
            'lib/work.js\n' ]
        , 'emits all files that would be published'
      )
      t.end()
    });
})

test('\nprepublish with files created during prepublish stage', function (t) {
  var entries = [];

  var cleanup = function (cb) {
    fs.unlink(__dirname + '/prepublish/file', function (err) {
      if (err) throw err;
      cb();
    });
  };

  irishPub(__dirname + '/prepublish')
    .on('error', t.fail.bind(t))
    .on('data', function (d) { entries.push(d.toString()) })
    .on('end', function () {
      t.deepEqual(
          entries
        , [ 'package.json\n',
            'file\n' ]
        , 'emits all files that would be published'
      );
      cleanup(t.end.bind(t));
    });
})
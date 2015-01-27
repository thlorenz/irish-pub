'use strict';
/*jshint asi: true */

var test = require('tap').test
  , irishPub = require('../')

var root = __dirname + '/foo';

function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true));
}

test('\nfoo with .gitignore and no .npmignore', function (t) {
  var entries = []
  t.plan(4);
  irishPub(root)
    .on('error', t.fail.bind(t))
    .on('metadata', function(meta) {
      t.equal(meta.name, 'foo');
      t.equal(meta.version, '1.2.3');
      t.type(meta.user, 'string');
    })
    .on('data', function (d) {
      entries.push(d.toString());
    })
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

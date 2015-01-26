'use strict';

var exec = require('child_process').exec
  , path = require('path')
  , PassThrough = require('readable-stream').PassThrough
  , Packer = require('fstream-npm')

var localName = function (entryPath, rootPath) {
  return entryPath.slice(path.dirname(rootPath).length + '/package/'.length);
};

var go = module.exports =

/**
 * Uses `fstream-npm` to determine what would be included during `npm publish`.
 *
 * @name irishPub
 * @function
 * @param {string} root path to package to publish, defaults to `cwd`
 * @return {ReadableStream} stream that emits all files with paths relative to `root` that will be packed via the `data` event
 */
function irishPub(root) {
  root = root || process.cwd();

  var out = new PassThrough();
  var scripts = require(path.join(root, 'package.json')).scripts;

  var printPaths = function () {
    Packer(root)
      .on('error', out.emit.bind(out, 'error'))
      .on('child', function (entry) {
        out.write(localName(entry.path, entry.root.path) + '\n');
      })
      .on('end', function () {
        out.emit('end');
      });
  };

  if (scripts && scripts.prepublish) {
    exec(scripts.prepublish, { cwd: root }, function (err) {
      if (err) {
        out.emit('error', err);
        return;
      }
      printPaths();
    });
  }
  else {
    printPaths();
  }

  return out;
}

'use strict';

var exec = require('child_process').exec
  , path = require('path')
  , fs = require('fs')
  , PassThrough = require('readable-stream').PassThrough
  , zlib = require('zlib')
  , tar = require('tar')

var go = module.exports = 

/**
 * Invokes `npm pack` to determine what would be included during `npm publish`.
 * 
 * @name irishPub
 * @function
 * @param {string} root path to package to publish, defaults to `cwd`
 * @return {ReadableStream} stream that emits all files with paths relative to `root` that will be packed via the `data` event
 */
function irishPub(root) {
  root = root || process.cwd();

  var out = new PassThrough();
  exec('npm pack ' + root, function (err, stderr, stdout) {
    if (err) return console.error(err);

    // npm logs created filename on stderr
    var tarFile = path.join(process.cwd(), stderr.trim()); 

    fs.createReadStream(tarFile)
      .on('error', out.emit.bind(out, 'error'))
      .pipe(zlib.createGunzip())
      .on('error', out.emit.bind(out, 'error'))
      .pipe(tar.Parse())
      .on('error', out.emit.bind(out, 'error'))
      .on('entry', function (e) {
        out.write(e.path.replace(/^package\//, '') + '\n');
      })
      .on('end', function () {
        fs.unlink(tarFile, function (err) {
          if (err) return out.emit(err);
          out.emit('end')
        })
      })
  })

  return out;
}

// Test
if (!module.parent && typeof window === 'undefined') {
  var root = __dirname + '/test/foo';

  go(root)
    .on('error', console.error)
    .pipe(process.stdout)
}

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

  getMetadata(root, function(err, meta) {
    if (err) return out.emit('error', err);
    out.emit('metadata', meta);
    listFiles(root, out, meta);
  });
  return out;
}

function getMetadata(root, callback) {
  exec('npm whoami', function (err, stdout, stderr) {
    if (err) return callback('Cannot get current npm user');
    var npmUser = stdout.trim();
    var packagePath = path.join(root, 'package.json');
    try {
      var pkg = require(packagePath);
    } catch (ex) {
      return callback('error', 'Invalid package: ' + packagePath);
    }
    callback(null, {
      name: pkg.name,
      version: pkg.version,
      user: npmUser
    });
  });
}

function listFiles(root, out, meta) {
  exec('npm pack ' + root, function (err, stdout, stderr) {
    if (err) return out.emit('error', 'Failed to pack archive: ' + err);

    // scoped packages get special treatment
    var name = meta.name;
    if (name[0] === '@') name = name.substr(1).replace(/\//g, '-');

    var tarFile = path.join(process.cwd(), name + '-' + meta.version + '.tgz');

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
}

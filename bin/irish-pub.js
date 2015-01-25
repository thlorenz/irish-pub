#!/usr/bin/env node
'use strict';
var irishPub = require('../')

process.stdout.write('npm publish will include the following files:\n\n');
irishPub(process.cwd())
  .on('error', function (err) { console.error(err) })
  .pipe(process.stdout)

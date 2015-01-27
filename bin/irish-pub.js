#!/usr/bin/env node
'use strict';
var irishPub = require('../')

irishPub(process.cwd())
.on('metadata', function(meta) {
  var details = meta.name + '@' + meta.version + ' as ' + meta.user;
  console.log('npm will publish ' + details + ', including the following files:\n');
})
.on('error', function (err) {
  console.error(err);
})
.pipe(process.stdout)

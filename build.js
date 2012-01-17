#!/usr/bin/env node
// Builder
//
// Copyright 2011 Iris Couch
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

var fs = require('fs')
  , util = require('util')
  , optimist = require('optimist')
  , SP = require('static-plus')

var OPTS = optimist.describe('db', 'Couch document URL')
                   .default('db', 'http://localhost:5984/blog/jason.io')
                   .describe('log', 'Log level')
                   .default('log', 'info')
  , ARGV = OPTS.argv

function main() {
  var builder = new SP.Builder
  builder.log.transports.console.level = ARGV.log

  builder.target = ARGV.db
  builder.template      = __dirname + '/www/interface.t.html'
  builder.partials.post = __dirname + '/www/post.t.html'

  builder.load('css/screen.css', __dirname + '/www/screen.css')

  builder.on('deploy', function(target) {
    var url = target.replace(/\?.*$/, '/static-plus/')
    console.log('Done: ' + url)
  })

  post(builder, __dirname + '/posts')
}

function post(builder, source) {
  builder.deploy()
}

if(ARGV.help) {
  OPTS.showHelp()
  process.exit(0)
} else if(require.main === module)
  main()

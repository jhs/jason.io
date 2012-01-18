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
  , ghm = require('github-flavored-markdown')
  , veil = require('veil').defaults({'keys':'underscore', 'dates':true})
  , optimist = require('optimist')
  , SP = require('static-plus')

function main() {
  var builder = new SP.Builder
  builder.target = ARGV.db
  builder.template      = __dirname + '/www/interface.t.html'
  builder.partials.post = __dirname + '/www/post.t.html'

  builder.load('css/screen.css', __dirname + '/www/screen.css', 'text/css')
  builder.load('yui/2/reset-fonts-grids.css', __dirname + '/www/yui/2/reset-fonts-grids.css', 'text/css')

  builder.on('deploy', function(target) {
    console.log('Done: ' + target.replace(/\?.*$/, '/static-plus/'))
  })

  fs.readdir(__dirname+'/posts', function(er, files) {
    if(er) throw er
    post_files(builder, files)
  })
}

function post_files(builder, files) {
  var file = files.shift()
  if(!file)
    return builder.deploy()

  fs.readFile(__dirname+'/posts/'+file, 'utf8', function(er, body) {
    if(er) throw er

    var post = veil.parse(body)
    post.body = ghm.parse(post.body)
    builder.doc({ '_id'  : file.replace(/\.md$/, '')
                , 'post' : post
                , 'title': post.subject
                , 'root' : '../'
                })

    post_files(builder, files)
  })
}

var OPTS = optimist.describe('db', 'Couch document URL')
                   .default('db', 'http://localhost:5984/blog/jason.io')
                   .describe('log', 'Log level')
                   .default('log', 'info')

var ARGV = OPTS.argv
if(ARGV.help) {
  OPTS.showHelp()
  process.exit(0)
}

if(require.main === module)
  main()

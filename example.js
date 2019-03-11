'use strict'

// example - insert srcset

const assert = require('assert')
const parse = require('rehype-parse')
const resolution = require('./')
const stringify = require('rehype-stringify')
const unified = require('unified')
const { log } = console

unified()
  .use(parse, {fragment: true})
  .use(resolution)
  .use(stringify)
  .process('<img src="logo@1x.png">', (er, file) => {
    if (er) throw er

    const { contents } = file
    const wanted = `<img src="logo@1x.png" \
      srcset="logo@1x.png 1x,logo@2x.png 2x,logo@3x.png 3x">`.trim()

    assert(contents, wanted)
    log(contents)
  })

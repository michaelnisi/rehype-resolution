'use strict'

// example - insert srcset

const parse = require('rehype-parse')
const resolution = require('./')
const stringify = require('rehype-stringify')
const unified = require('unified')
const { log } = console

unified()
  .use(parse, { fragment: true })
  .use(resolution)
  .use(stringify)
  .process('<img src="logo@1x.png">', (er, file) => {
    if (er) throw er

    const { contents } = file

    log(contents)
  })

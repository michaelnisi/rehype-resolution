'use strict'

const rehypeParse = require('rehype-parse')
const rehypeResolution = require('./')
const rehypeStringify = require('rehype-stringify')
const unified = require('unified')
const { test } = require('tap')

function parse (html, cb) {
  unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeResolution)
    .use(rehypeStringify)
    .process(html, cb)
}

test('the basics', t => {
  const fixtures = [
    ['<img src="img/elva.jpg" alt="Dressed as a fairy">',
     '<img src="img/elva.jpg" alt="Dressed as a fairy">'],
    ['<img src="img/elva@1x.jpg" alt="Dressed as a fairy">',
     '<img src="img/elva@1x.jpg" alt="Dressed as a fairy" srcset="img/elva@1x.jpg 1x, img/elva@2x.jpg 2x, img/elva@3x.jpg 3x">'],
    ['<img src="img/elva@1x.jpg" srcset="img/etal@1x.jpg 1x, img/etal@2x.jpg 2x, img/etal@3x.jpg 3x">',
     '<img src="img/elva@1x.jpg" srcset="img/etal@1x.jpg 1x, img/etal@2x.jpg 2x, img/etal@3x.jpg 3x">']
  ]

  t.plan(fixtures.length)

  fixtures.forEach(([src, wanted]) => {
    parse(src, (er, found) => {
      if (er) throw er

      const { contents } = found

      t.is(contents, wanted)
    })
  })
})

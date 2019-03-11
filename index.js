'use strict'

// resolution - insert srcset attribute

const visit = require('unist-util-visit')
const path = require('path')

module.exports = resolution

function transform (tree) {

  function visitor (node) {
    const { tagName, properties: { src, srcSet } } = node

    if (tagName !== 'img' || typeof src !== 'string' || srcSet) return

    const { dir, ext, name } = path.parse(src)
    const found = name.split('@')
    const markers = ['1x', '2x', '3x']

    if (found[1] !== markers[0]) return

    const id = found[0]
    const names = markers.map(x => path.join(dir, `${id}@${x}${ext} ${x}`))

    node.properties.srcSet = `${names.join(', ')}`
  }

  visit(tree, ['element'], visitor)
}

function resolution () {
  return transform
}

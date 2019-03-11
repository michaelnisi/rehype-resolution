[![Build Status](https://secure.travis-ci.org/michaelnisi/rehype-resolution.svg)](http://travis-ci.org/michaelnisi/rehype-resolution)
[![Coverage Status](https://coveralls.io/repos/github/michaelnisi/rehype-resolution/badge.svg?branch=master)](https://coveralls.io/github/michaelnisi/rehype-resolution?branch=master)

# rehype-resolution

The **rehype-resolution** [Node.js](https://nodejs.com) package provides a [rehype](https://github.com/rehypejs/rehype) plugin for inserting `srcset` attributes into `img` elements. **rehype** is a [unified](https://unified.js.org) HTML processor.

The [srcset](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-srcset) attribute of the `img` element enables [responsive images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images).  This plugin inserts a `srcset` for resolution switching, allowing different resolutions at the same size.

> If you're supporting multiple display resolutions, but everyone sees your image at the same real-world size on the screen, you can allow the browser to choose an appropriate resolution image by using srcset with x-descriptors and without sizes — a somewhat easier syntax!

The **rehype-resolution** plugin inserts a set of possible image sources (`@1x`, `@2x`, and `@3x`), following Apple’s naming convention for [image size and resolution](https://developer.apple.com/design/human-interface-guidelines/ios/icons-and-images/image-size-and-resolution/). Users have to produce these images and make them available at the according paths.

The transformation is only applied for file names ending with `@1x.*`. That’s the marker for the transform. Elements with an existing `srcset` attribute are ignored.

## Motivation

Generating a static website from Markdown, I want crisp images on all devices.

## Inserting the srcset attribute

We have an image at three resolutions, `elva@1x.jpg`, `elva@2x.jpg`, and `elva@3x.jpg`. Let’s assume we don’t control the HTML, maybe it’s generated from Markdown, leaving us with HTML like this.

```html
<img src="img/elva@1x.jpg" alt="Dressed as a fairy">
```

To let the browser pick the optimal image, this transform inserts the `srcset` attribute for three resolutions, allowing us to keep referencing the image with a single URI in our Markdown or whatever HTML source we might have.

```html
<img srcset="img/elva@1x.jpg,img/elva@2x.jpg,img/elva@3x.jpg" src="img/elva@1x.jpg" alt="Dressed as a fairy">
```

## Example

Here’s an examplary `unified` processor.

```js
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
```

You find this example in this repo.

```
$ node example.js
```

## Installing

To install **rehype-resolution** with [npm](https://www.npmjs.com), do:

```
$ npm install rehype-resolution
```

## License

[MIT License](https://raw.github.com/michaelnisi/rehype-resolution/master/LICENSE)

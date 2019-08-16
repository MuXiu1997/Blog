import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import emoji from 'markdown-it-emoji'

import uslug from 'uslug'

import highlight from './highlight.js'

const uslugify = (s) => {
  return uslug(s)
}

export default function createMarkdownIt () {
  return new MarkdownIt({
    highlight: highlight
  })
  // 锚点插件
    .use(anchor, {
      permalink: true,
      permalinkSymbol: '#',
      level: [1, 2, 3, 4, 5, 6],
      permalinkBefore: true,
      slugify: uslugify
    })
    .use(emoji)
}

import jsdom from 'jsdom'
import chai from 'chai'
import chaiImmutable from 'chai-immutable'

const {JSDOM} = jsdom

const {window} = new JSDOM('<!doctype html><html><body></body></html>')
const {document} = window

global.document = document
global.window = window

Object.keys(window).forEach((key) => {
  if (!(key in global)) {
    global[key] = window[key]
  }
})

global.navigator = {
  userAgent: 'node.js'
}


chai.use(chaiImmutable)
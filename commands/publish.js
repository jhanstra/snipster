const cson = require('cson')
const jsontoxml = require('jsontoxml')
const init = require('./init')
const { atomMatcher, vscodeMatcher, sublimeMatcher } = require('../utils/matchers')
const { atomComment, vscodeComment, sublimeComment } = require('../utils/comments')
const { files, home, exists, write, read } = require('../utils/general')
const { SNIPSTER_CONFIG, ATOM_PATH, VSCODE_PATH, SUBLIME_PATH, STYLE_FILE_PATH, ALL_FILE_PATH } = require('../utils/constants')

const addSnippetsToEditor = async (snippets, editor) => {
  switch (editor) {
    case 'atom':
      const formatted = {}
      for (let lang in snippets) {
        formatted[atomMatcher(lang)] = {}
        for (let prefix in snippets[lang]) {
          formatted[atomMatcher(lang)][prefix] = {
            prefix,
            body: snippets[lang][prefix]
          }
        }
      }
      write(`${home()}/.atom/snippets.cson`, `${await atomComment()}\n${cson.stringify(formatted, null, 2)}`)
      break
    case 'vscode':
      for (let lang in snippets) {
        const formatted = {}
        for (let prefix in snippets[lang]) {
          formatted[prefix] = {
            prefix,
            body: snippets[lang][prefix].split('\n'),
          }
        }
        const vscodeLang = vscodeMatcher(lang)
        const content = `${await vscodeComment()}\n${JSON.stringify(formatted, null, 2)}`
        write(`${VSCODE_PATH}/${vscodeLang}.json`, content)
      }
      break
    case 'sublime text':
      for ( let lang in snippets ) {
        for ( let prefix in snippets[lang] ) {
          const snippetObject = {
            snippet: {
              tabTrigger: prefix,
              scope: sublimeMatcher(lang),
              content: jsontoxml.cdata(snippets[lang][prefix])
            }
          }
          const content = `${await sublimeComment()}\n${jsontoxml(snippetObject, { prettyPrint: true })}`
          write(`${SUBLIME_PATH}/${prefix}.sublime-snippet`, content)
        }
      }
      break
  }
}

const publish = async () => {
  if (!exists(SNIPSTER_CONFIG)) { init(); return; }

  const settings = await read(SNIPSTER_CONFIG)
  const snipsterFiles = files(settings.directory)

  const snippets = await snipsterFiles.reduce(async (previousPromise, path) => {
    const acc = await previousPromise
    const langs = path && path.substring(path.lastIndexOf('.') + 1)
      .toLowerCase().replace('style', STYLE_FILE_PATH)
      .replace('all', ALL_FILE_PATH).split('+')
    const prefix = path.substring(path.lastIndexOf('/') + 1, path.lastIndexOf('.'))
    const body = await read(path)

    // for each language in the extension, add the snippet
    langs.forEach(lang => {
      if (acc && acc.hasOwnProperty(lang)) {
        acc[lang][prefix] = body
      } else {
        acc[lang] = {}
        acc[lang][prefix] = body
      }
    })

    return acc
  }, {})

  const editors = process.argv[3] ? process.argv.slice(3) : settings.editors
  editors.map(editor => {
    addSnippetsToEditor(snippets, editor.toLowerCase())
  })
}

module.exports = publish
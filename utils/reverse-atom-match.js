const getExtensionFromAtomLanguageScope = (languageScope) => {
  switch(languageScope) {
    case '.text, .source':
      return 'all'
    case '.source.clojure' :
      return 'clj'
    case '.source.coffee':
      return 'coffee'
    case '.source.cs':
      return 'cs'
    case '.source.css':
      return 'css'
    case '.source.cpp':
      return 'cpp'
    case '.source.fs':
      return 'fs'
    case '.text.git-commit':
      return 'git'
    case '.source.hbs':
      return 'hbs'
    case '.text.html':
      return 'html'
    case '.source.js':
      return 'js'
    case '.source.jsx':
      return 'jsx'
    case '.source.css.less':
      return 'less'
    case '.source.makefile':
      return 'make'
    case '.source.gfm':
      return 'md'
    case '.text.html.mustache':
      return 'mustache'
    case '.source.objc':
      return 'objc'
    case '.text.html.php':
      return 'php'
    case '.source.perl':
      return 'pl'
    case '.source.powershell':
      return 'ps1'
    case '.source.razor':
      return 'vbhtml'
    case '.source.html.erb':
      return 'rb'
    case '.text.html.ruby':
      return '.ror'
    case '.source.scss':
      return 'scss'
    case '.source.shell':
      return 'sh'
    case '.source.ts, .source.tsx':
    case '.source.ts':
    case '.source.tsx':
      return 'ts'
    case '.text.xml':
      return 'xml'
    case '.source.yaml':
      return 'yml'
    default:
      return languageScope.replace('.source.', '')
  }
}

module.exports = getExtensionFromAtomLanguageScope
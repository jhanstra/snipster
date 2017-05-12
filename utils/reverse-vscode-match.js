const getExtensionFromVSCodeLanguageScope = (languageScope) => {
  switch(languageScope) {
    case 'clojure' :
      return 'clj'
    case 'coffeescript':
      return 'coffee'
    case 'csharp':
      return 'cs'
    case 'cpp':
      return 'cpp'
    case 'fsharp':
      return 'fs'
    case 'git-commit':
      return 'git'
    case 'handlebars':
      return 'hbs'
    case 'javascript':
      return 'js'
    case 'javascriptreact':
      return 'jsx'
    case 'makefile':
      return 'make'
    case 'markdown':
      return 'md'
    case 'objective-c':
      return 'objc'
    case 'powershell':
      return 'ps1'
    case 'razor':
      return 'cshtml'
    case 'ruby':
      return 'rb'
    case 'scss':
      return 'scss'
    case 'shellscript':
      return 'sh'
    case 'typescript':
      return 'ts'
    case 'yaml':
      return 'yml'
    default:
      return languageScope
  }
}

module.exports = getExtensionFromVSCodeLanguageScope
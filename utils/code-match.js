const getLanguageFileNameForVSCode = (language) => {
  switch(language) {
    case (''):
      return 'plaintext'
    case ('clj' || 'cljs' || 'cljc' || 'edn' ):
      return 'clojure'
    case ('coffee' || 'coffeelit'):
      return 'coffeescript'
    case ('cs'):
      return 'csharp'
    case ('cc'):
      return 'cpp'
    case ('f#' || 'fs' || 'fsi' || 'ml' || 'mli' || 'fsx' || 'fsscript'):
      return 'fsharp'
    case ('git' || 'gitcommit' || 'gitrebase'):
      return 'git-commit'
    case ('hbs'):
      return 'handlebars'
    case ('js' || 'javascript'):
      return 'javascript'
    case ('jsx' || 'react'):
      return 'javascriptreact'
    case ('make'):
      return 'makefile'
    case ('md' || 'markdown' || 'gfm' || 'mark' || 'mkdown' || 'mdml' || 'mdown' || 'mdtext'):
      return 'markdown'
    case ('m' || 'h' || 'objc' || 'objective-c' || 'objectivec' || 'oc'):
      return 'objective-c'
    case ('ps1' || 'ps' || 'pwrshell'):
      return 'powershell'
    case ('cshtml' || 'vbhtml'):
      return 'razor'
    case ('rb' || 'so' || 'ror' || 'rubyonrails'):
      return 'ruby'
    case ('sass' || 'scss'):
      return 'scss'
    case ('sh' || 'bash' || 'shell'):
      return 'shellscript'
    case ('ts'):
      return 'typescript'
    case ('yml'):
      return 'yaml'
    default:
      return language
  }
}

module.exports = getLanguageFileNameForVSCode
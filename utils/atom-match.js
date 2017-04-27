const getLanguageScopeForAtom = (language) => {
  switch(language) {
    case (''):
      return '.text.plain'
    case ('clj' || 'cljs' || 'cljc' || 'edn' ):
      return '.source.clojure'
    case ('coffee' || 'coffeelit'):
      return '.source.coffee'
    case ('cs', 'csharp'):
      return '.source.cs'
    case ('css'):
      return '.source.css'
    case ('cc' || 'cpp'):
      return '.source.cpp'
    case ('f#' || 'fs' || 'fsi' || 'ml' || 'mli' || 'fsx' || 'fsscript'):
      return '.source.fs'
    case ('git' || 'gitcommit' || 'gitrebase'):
      return '.text.git-commit'
    case ('handlebars' || 'hbs'):
      return '.source.hbs'
    case ('html'):
      return '.text.html'
    case ('js' || 'javascript'):
      return '.source.js'
    case ('jsx' || 'react'):
      return '.source.jsx'
    case ('less'):
      return '.source.css.less'
    case ('make'):
      return '.source.makefile'
    case ('md' || 'markdown' || 'gfm' || 'mark' || 'mkdown' || 'mdml' || 'mdown' || 'mdtext'):
      return '.source.gfm'
    case ('mustache'):
      return '.text.html.mustache'
    case ('m' || 'h' || 'objc' || 'objective-c' || 'objectivec' || 'oc'):
      return '.source.objc'
    case ('php'):
      return '.text.html.php'
    case ('ps1' || 'ps' || 'pwrshell'):
      return '.source.powershell'
    case ('cshtml' || 'vbhtml'):
      return '.source.razor'
    case ('rb' || 'so'):
      return '.source.html.erb'
    case ('ror' || 'rubyonrails'):
      return '.text.html.ruby'
    case ('sass' || 'scss'):
      return '.source.scss'
    case ('sh' || 'bash' || 'shell'):
      return '.source.shell'
    case ('ts'):
      return '.source.ts, .source.tsx'
    case ('xml'):
      return '.text.xml'
    case ('yml'):
      return '.source.yaml'
    default:
      return '.source.' + language
  }
}

module.exports = getLanguageScopeForAtom
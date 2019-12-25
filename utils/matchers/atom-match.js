const atomMatcher = (language) => {
  switch(language) {
    case 'all':
      return '.text, .source'
    case 'clj':
    case 'cljs':
    case 'cljc':
    case 'edn' :
      return '.source.clojure'
    case 'coffee':
    case 'coffeelit':
      return '.source.coffee'
    case 'cs':
    case 'csharp':
      return '.source.cs'
    case 'css':
      return '.source.css'
    case 'cc':
    case 'cpp':
      return '.source.cpp'
    case 'f#':
    case 'fs':
    case 'fsi':
    case 'ml':
    case 'mli':
    case 'fsx':
    case 'fsscript':
      return '.source.fs'
    case 'git':
    case 'gitcommit':
    case 'gitrebase':
      return '.text.git-commit'
    case 'handlebars':
    case 'hbs':
      return '.source.hbs'
    case 'html':
      return '.text.html'
    case 'js':
    case 'javascript':
      return '.source.js'
    case 'jsx':
    case 'react':
      return '.source.jsx'
    case 'less':
      return '.source.css.less'
    case 'make':
      return '.source.makefile'
    case 'md':
    case 'markdown':
    case 'gfm':
    case 'mark':
    case 'mkdown':
    case 'mdml':
    case 'mdown':
    case 'mdtext':
      return '.source.gfm'
    case 'mustache':
      return '.text.html.mustache'
    case 'm':
    case 'h':
    case 'objc':
    case 'objective-c':
    case 'objectivec':
    case 'oc':
      return '.source.objc'
    case 'php':
      return '.text.html.php'
    case 'pl':
      return '.source.perl'
    case 'ps1':
    case 'ps':
    case 'pwrshell':
      return '.source.powershell'
    case 'cshtml':
    case 'vbhtml':
      return '.source.razor'
    case 'rb':
    case 'so':
      return '.source.html.erb'
    case 'ror':
    case 'rubyonrails':
      return '.text.html.ruby'
    case 'sass':
    case 'scss':
      return '.source.scss'
    case 'sh':
    case 'bash':
    case 'shell':
      return '.source.shell'
    case 'ts':
      return '.source.ts, .source.tsx'
    case 'xml':
      return '.text.xml'
    case 'yml':
      return '.source.yaml'
    default:
      return '.source.' + language
  }
}

module.exports = atomMatcher
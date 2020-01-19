const { home } = require('./general')

const SNIPSTER_PATH = `${home()}/snipster`
const SNIPSTER_CONFIG = `${home()}/snipster/config.json`
const ATOM_PATH = `${home()}/.atom/snippets.cson`
const VSCODE_PATH = `${home()}/Library/Application\ Support/Code/User/snippets`
const SUBLIME_PATH = `${home()}/Library/Application\ Support/Sublime Text 3/Packages/User`
const STYLE_FILE_PATH = 'css+scss+less+js+jsx+ts+tsx'
const LANGUAGES = [
  { name: 'C', value: 'c' },
  { name: 'Clojure', value: 'clj' },
  { name: 'Coffescript', value: 'coffee' },
  { name: 'C#', value: 'csharp' },
  { name: 'CSS',  value: 'css' },
  { name: 'C++', value: 'cpp' },
  { name: 'F#', value: 'f#' },
  { name: 'Git', value: 'git' },
  { name: 'Go', value: 'go' },
  { name: 'Groovy', value: 'groovy' },
  { name: 'Handlebars', value: 'hbs' },
  { name: 'HTML', value: 'html' },
  { name: 'Jade', value: 'jade' },
  { name: 'Java', value: 'java' },
  { name: 'Javascript', value: 'js' },
  { name: 'JSON', value: 'json' },
  { name: 'React (JSX)', value: 'jsx' },
  { name: 'Less', value: 'less' },
  { name: 'Liquid', value: 'liquid' },
  { name: 'Lua', value: 'lua' },
  { name: 'Make', value: 'make' },
  { name: 'Markdown', value: 'md' },
  { name: 'Mustache', value: 'mustache' },
  { name: 'Objective-C', value: 'objc' },
  { name: 'PHP', value: 'php' },
  { name: 'Perl', value: 'pl' },
  { name: 'Plaintext', value: 'plain' },
  { name: 'Powershell', value: 'pwrshell' },
  { name: 'R', value: 'r' },
  { name: 'Python', value: 'python' },
  { name: 'Ruby', value: 'rb' },
  { name: 'Ruby on Rails', value: 'ror' },
  { name: 'SCSS', value: 'sass' },
  { name: 'Shell', value: 'bash' },
  { name: 'SQL', value: 'sql' },
  { name: 'Swift', value: 'swift' },
  { name: 'TOML', value: 'toml' },
  { name: 'Typescript (+ TSX)', value: 'ts' },
  { name: 'Visual Basic', value: 'vb' },
  { name: 'XML', value: 'xml' },
  { name: 'XSL', value: 'xsl' },
  { name: 'YAML', value: 'yaml' },
]
const ALL_FILE_PATH = LANGUAGES.reduce((acc, x)  => `${acc}+${x.value}`, '').substr(1)

const ALL_SUBLIME = 'source.clojure,source.coffee,source.cs,source.css,source.cpp,source.fs,text.git-commit,source.hbs,text.html,source.js,source.jsx,source.css.less,source.makefile,text.html.markdown,text.html.mustache,source.objc,text.html.php,source.perl,source.powershell,source.razor,source.ruby,source.scss,source.shell,source.typescript,text.xml,source.yaml,source.erlang,source.go,source.groovy,source.haskell,source.java,source.json,text.log.latex,text.tex.latex,text.tex,source.lisp,source.lua,text.html.markdown.multimarkdown,source.matlab,source.ocaml,source.php,source.r,source.regexp.python,source.python,source.ruby.rails,source.regexp,source.ruby,source.scala,source.shell,source.sql,source.stylus,text.plain,text.xml,text.xml.xsl'

module.exports = {
  SNIPSTER_PATH,
  SNIPSTER_CONFIG,
  ATOM_PATH,
  VSCODE_PATH,
  SUBLIME_PATH,
  STYLE_FILE_PATH,
  ALL_FILE_PATH,
  ALL_SUBLIME,
  LANGUAGES,
}
const { home } = require('./general')

const ATOM_PATH = `${home()}/.atom/snippets.cson`
const VSCODE_PATH = `${home()}/Library/Application\ Support/Code/User/snippets`
const SUBLIME_PATH = `${home()}/Library/Application\ Support/Sublime Text 3/Packages/User`
const STYLE_FILE_PATH = 'css+scss+less+js'
// const ALL_FILE_PATH = 'c+clj+coffee+cs+cc+css+fs+git+go+groovy+hbs+html+jade+java+js+jsx+json+less+liquid+lua+make+md+objc+pl+php+plain+python+ps1+r+cshtml+rb+rust+scss+sh+sql+swift+toml+ts+vb+xml+xsl+yaml'
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
const ALL_FILE_PATH = LANGUAGES.reduce((acc, x)  => `${acc}+${x.value}`, '')

module.exports = {
  ATOM_PATH,
  VSCODE_PATH,
  SUBLIME_PATH,
  STYLE_FILE_PATH,
  ALL_FILE_PATH,
  LANGUAGES,
}
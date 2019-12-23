const questions = [
  {
    type: 'input',
    name: 'directory',
    message: `Enter a pathname to your snippets folder`,
  },
  {
    type: 'checkbox',
    name: 'editors',
    message: "Which editors would you like to publish to?",
    choices: [
      { name: 'VSCode', checked: false },
      { name: 'Atom', checked: false },
      { name: 'Sublime Text', checked: false },
    ]
  },
]

module.exports = questions
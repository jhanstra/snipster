const questions = [
  {
    type: 'input',
    name: 'directory',
    message: `Where would you like to keep your snippets (or where do you keep them now)? Press 'enter' to select current directory`,
  },
  {
    type: 'input',
    name: 'editor
    message: "Which editors would you like to publish to?",
    choices: [
      { name: 'VSCode', checked: false },
      { name: 'Atom', checked: false },
      { name: 'Sublime Text', checked: false },
    ]
  },
]

module.exports = questions
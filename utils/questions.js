const questions = {
  init: [{
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
  // {
  //   type: 'checkbox',
  //   name: 'languages',
  //   message: "Which languages do you work with?",
  //   choices: LANGUAGES
  // }
  ],
  initAgain: [{
    type: 'confirm',
    name: 'reset',
    message: 'You have a .snipster config file already set up. Do you want to set up again?'
  }],
  addSnippets: [{
    type: 'confirm',
    name: 'addSnippets',
    message: 'Do you want to get started adding snippets to your directory?'
  }],
  more: [{
    type: 'confirm',
    name: 'more',
    message: 'Add more?'
  }],
  add: [{
    type: 'input',
    name: 'prefix',
    message: 'Prefix (the trigger keyword for your snippet):'
  },{
    type: 'input',
    name: 'langs',
    message: `Language (for multiple languages, use 'all' or 'style' or separate with a plus mark, like 'html+css+js':`,
  }],
}

module.exports = questions
# snipster

### publish all of your snippets to all of your editors with one command.

write and arrange snippets *by file*, rather than tediously hand-editing 1000-line json/cson/xml files. no meta content.

## install & set-up
```
yarn global add snipster
-- or --
npm install -g snipster

snipster init
```

## how it works
write snippets as you would normally write code - don't worry about wrangling them into a json or xml object, rewriting them for every text editor you use, quoting every single line, escaping tabs and new lines, indenting, etc. leave all of that complexity for snipster.

1. the name of your snippet file is the prefix you use to call it.
2. the file extension of your snippet file is the language scope under which the snippet can be used. get fancy with multi-scope extensions like 'html+md+txt' that will make the snippet available to those scopes, or use shortcut extensions like 'all' or 'style' to use the snippet in *all* file types or all similar *style* file types (css, less, scss), respectively.
3. the content of the file is the snippet body, exactly what will appear when you type the prefix and tab. use tab stop fields ($1, $2) and placeholders ($1{placeholder}) just like you would normally.

## examples
for many more examples and inspiration, see my [snippets directory](https://github.com/jhanstra/dotfiles/tree/master/snippets).

**hipsum.md**
```
Man bun mumblecore bicycle rights next level, distillery scenester fanny pack art party master cleanse.
```

**rcc.js**
```
export default class $1 extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      $2
    )
  }
}

$1.propTypes = {
  $3
};
```

**doctype.html**
```
<!doctype html>

<html lang="en">
  <head>
    <meta charset="utf-8">

    <title>$1</title>
    <meta name="description" content="$2">
    <meta name="author" content="$3">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="$4">

    <!--[if lt IE 9]>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.js"></script>
    <![endif]-->
  </head>

  <body>
    $5
  </body>
</html>
```

## support
snipster currently supports [vscode](https://code.visualstudio.com/), [atom](https://atom.io/), and [sublime](https://www.sublimetext.com/) on mac only. support for windows and more editors should be coming soon - suggestions and contributions welcome. 

<!--## benefits
- **write once.** write your snippet once, publish to all of your text editors
- **easy to write.** just write the snippet, don't write a JSON object
- **easily manage scope.** -->

## api
- `snipster init`
  - get set up with snipster by telling it where your snippets are and which text editors you use. snipster will transfer over your editors' pre-existing snippets.

- `snipster publish`
  - publish all of the snippets in your directory to your text editors. after running this, you should be able to use all of your snippets across any editor.
  - **options:** [editor(s)] - publish only to certain editors by passing them as arguments, e.g. `snipster publish atom` or `snipster publish code`.

- `snipster list`
  - list all of the snippets in your directory.
  - **options:** [language] - filter by language scope, e.g. `snipster list js` or `snipster list md`.

- `snipster help`
  - alias for `snipster --help`. provides details on how to use snipster.

## comparison
less code is better code. simpler code is better code.

**vs code**
```
"Hipster Ipsum": {
  "prefix": "hipsum",
  "body": [
    "Man bun mumblecore bicycle rights next level, distillery scenester fanny pack art party master cleanse."
  ],
  "description": "Hipster-flavored filler text"
},
... all of your other snippets ...
```

**atom**
```
'.source.gfm':
  'Hipster Ipsum':
    prefix: "hipsum"
    body: "Man bun mumblecore bicycle rights next level, distillery scenester fanny pack art party master cleanse."
  ... all of your other snippets ...
```

**snipster**
```
Man bun mumblecore bicycle rights next level, distillery scenester fanny pack art party master cleanse.
```

## contribute or donate
contributions are welcome and enormously helpful. submit feature ideas, issues, pull requests, etc. 

if you find value in snipster please feel free to [buy me a ☕](https://www.paypal.me/jhanstra/4) :)
# [snipster](http://www.jaredhanstra.com/blog/2017-05-09-snipster/) · [![npm version](https://badge.fury.io/js/snipster.svg)](https://badge.fury.io/js/snipster)

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

1. the name of your snippet file is the prefix and the description you use to call it with '_' to separate them.
2. the file extension of your snippet file is the language scope under which the snippet can be used. get fancy with *multi-scope* extensions like 'html+md+txt' that will make the snippet available to several scopes, or use *named* shortcut extensions like 'all' or 'style' to use the snippet in *all* file types or all similar *style* file types (css, less, scss), respectively.
3. the content of the file is the snippet body, exactly what will appear when you type the prefix and tab. use tab stop fields ($1, $2) and placeholders (${1:placeholder}) just like you would normally.

## examples

**hipsum_what is this used for.md**
```
Man bun mumblecore bicycle rights next level, distillery scenester fanny pack art party master cleanse.
```

**rcc_detail description.js**
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

**doctype_more information.html**
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
This version of snipster currently supports [vscode](https://code.visualstudio.com/), [atom](https://atom.io/), and [sublime](https://www.sublimetext.com/) on windows only.

all language scopes that text editors support are theoretically supported, but please submit issues if any are not working.

## disclaimer
snipster in this repo is forked from [jhanstra](https://github.com/jhanstra/snipster).

snipster is not at 1.0 level yet. it has been tested only on the creator's [machine](http://i.memecaptain.com/gend_images/fAu8Pg.png) so far. if you have snippets already in your text editors, it is recommended to back them up before running snipster, just in case. however, snipster also does this backing up and transferring, so if all goes well you shouldn't need to worry about anything. if anything does go wrong for you, please [submit an issue!](https://github.com/jhanstra/snipster/issues/new) :)

<!--## benefits
- **write once.** write your snippet once, publish to all of your text editors
- **easy to write.** just write the snippet, don't write a JSON object
- **easily manage scope.** -->

## api
- `snipster init`
  - get set up with snipster by telling it where your snippets are and which text editors you use. snipster will transfer over your editors' pre-existing snippets.

- `snipster publish`
  - publish all of the snippets in your directory to your text editors. after running this, you should be able to use all of your snippets across any editor.
  - **options:** 
  - [editor(s)] - *optional* - publish only to certain editors by passing them as arguments, e.g. `snipster publish atom` or `snipster publish code`.

- `snipster add [snippet name]`
  - add a snippet to your directory from the command line and publish to your editors. this will open your default editor (or vi) where you can write the body of the snippet.
  - **options:**
    - [snippet name] - **required** - the prefix and file extension of the snippet to add (e.g. lorem.js)
    - [path] - *optional* - a folder or path within your snippets directory to place the snippet (e.g. javascript)

- `snipster list`
  - list all of the snippets in your directory.
  - **options:**
    - [language] - *optional* - filter by language scope, e.g. `snipster list js` or `snipster list md`.

- `snipster help`
  - alias for `snipster --help`. provides details on how to use snipster.

- list of named extensions:
  - **all**: all languages
  - **style**: css + scss + less

## comparison
let's add a snippet called 'hipsum' which writes hipster-flavored lorem ipsum to our editor inside markdown files only.

**in vs code** (`code/user/snippets/markdown.json`)
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

**in atom** (`.atom/snippets.cson`)
```
'.source.gfm':
  'Hipster Ipsum':
    prefix: "hipsum"
    body: "Man bun mumblecore bicycle rights next level, distillery scenester fanny pack art party master cleanse."
  ... all of your other snippets ...
```

**in sublime** (`sublime/packages/user/hipsum.sublime-snippet`)
```
<snippet>
	<tabTrigger>hipsum</tabTrigger>
	<scope>text.html.markdown</scope>
	<content><![CDATA[Man bun mumblecore bicycle rights next level, distillery scenester fanny pack art party master cleanse.]]></content>
</snippet>

```

**in snipster** (`hipsum__what is this used for.md`)

after running `snipster publish`, hipsum is available in *[all of our text editors](https://giphy.com/search/mind-blown)*.

```
Man bun mumblecore bicycle rights next level, distillery scenester fanny pack art party master cleanse.
```

## contribute or donate
contributions are welcome and enormously helpful. submit [feature ideas](https://github.com/jhanstra/snipster/projects/1), [issues](https://github.com/jhanstra/snipster/issues/new), [pull requests](https://github.com/jhanstra/snipster/pulls), etc. 

if you find value in snipster please feel free to [buy jhanstra a ☕](https://www.paypal.me/jhanstra/4) :)
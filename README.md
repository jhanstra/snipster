# Snipster

### Publish all of your snippets to all of your editors with one command.

Write and arrange snippets _by file_, rather than tediously hand-editing 1000-line json/cson/xml files. No meta content.

## install & set-up

```
yarn global add snipster
-- or --
npm install -g snipster

snipster init

-- or --
npx snipster init
```

## how it works

Write snippets as you would normally write code - don't worry about wrangling them into a json or xml object, rewriting them for every text editor you use, quoting every single line, escaping tabs and new lines, indenting, etc. Leave all of that complexity for snipster.

1. The name of your snippet file is the prefix you use to call it when writing code.
2. The file extension of your snippet file is the language scope under which the snippet can be used. Get fancy with _multi-scope_ extensions like 'html+md+txt' that will make the snippet available to several scopes, or use _named_ shortcut extensions like 'all' or 'style' to use the snippet in _all_ file types or all similar _style_ file types (css, less, scss), respectively.
3. The content of the file is the snippet body, exactly what will appear when you type the prefix and tab. Use tab stop fields ($1, $2) and placeholders (\${1:placeholder}) just like you would normally.

## Examples

For many more examples and inspiration, see the creator's [snippets directory](https://github.com/jhanstra/dotfiles/tree/master/snippets).

**rc.js**

```
const $1 = props => {
  return (
    <$2>
      $3
    </$2>
  )
}
```

**styled.js**

```
const $1 = styled.$2`
  $3
`
```

**hipsum.md**

```
Man bun mumblecore bicycle rights next level, distillery scenester fanny pack art party master cleanse.
```

**cl.css**

```
.$1 {
  $2
}
```

**html5.html**

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
  </head>

  <body>
    $5
  </body>
</html>
```

## Editor Support

Snipster currently supports [VSCode](https://code.visualstudio.com/), [Atom](https://atom.io/), and [Sublime](https://www.sublimetext.com/) on Mac only. Support for Windows and more editors may come at some point, but PRs are welcome.

## Disclaimer

Snipster is not at 1.0 level yet. It has been tested only on the creator's [machine](http://i.memecaptain.com/gend_images/fAu8Pg.png) so far. If you have snippets already in your text editors, it is recommended to back them up before running snipster, just in case. However, snipster also does this backing up and transferring, so if all goes well you shouldn't need to worry about anything. If anything does go wrong for you, please [submit an issue!](https://github.com/jhanstra/snipster/issues/new) :)

## API

- `snipster init`: Get set up with snipster by telling it where your snippets are and which text editors you use. Snipster will transfer over your editors' pre-existing snippets.

- `snipster publish`: Publish all of the snippets in your directory to your text editors. After running this, you should be able to use all of your snippets across any editor.

  - **options:**
  - [editor(s)] - _optional_ - publish only to certain editors by passing them as arguments, e.g. `snipster publish atom` or `snipster publish code`.

- `snipster add [snippet name]`

  - add a snippet to your directory from the command line and publish to your editors. this will open your default editor (or vi) where you can write the body of the snippet.
  - **options:**
    - [snippet name] - **required** - the prefix and file extension of the snippet to add (e.g. lorem.js)
    - [path] - _optional_ - a folder or path within your snippets directory to place the snippet (e.g. javascript)

- `snipster list`

  - list all of the snippets in your directory.
  - **options:**
    - [language] - _optional_ - filter by language scope, e.g. `snipster list js` or `snipster list md`.

- `snipster help`

  - alias for `snipster --help`. provides details on how to use snipster.

- list of named extensions:
  - **all**: all languages
  - **style**: css + scss + less

## Comparison

To see how much code Snipster helps you save, let's add a snippet called 'hipsum' which writes hipster-flavored lorem ipsum to our editor inside **markdown** files only. In each of these editors we have to first track down the correct file, then add the following code to it. (Comments are added to point out other issues with snippets).

**In VSCode** (`code/user/snippets/markdown.json`)

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

**In Atom** (`.atom/snippets.cson`)

```
'.source.gfm':
  'Hipster Ipsum':
    prefix: "hipsum"
    body: "Man bun mumblecore bicycle rights next level, distillery scenester fanny pack art party master cleanse."
  ... all of your other snippets ...
```

**In Sublime** (`sublime/packages/user/hipsum.sublime-snippet`)

```
<snippet>
	<tabTrigger>hipsum</tabTrigger>
	<scope>text.html.markdown</scope>
	<content><![CDATA[Man bun mumblecore bicycle rights next level, distillery scenester fanny pack art party master cleanse.]]></content>
</snippet>

```

**In Snipster** (`hipsum.md`)

after running `snipster publish`, hipsum is available in _[all of our text editors](https://giphy.com/search/mind-blown)_.

```
Man bun mumblecore bicycle rights next level, distillery scenester fanny pack art party master cleanse.
```

## Contribute

Contributions are welcome and enormously helpful. Submit [feature ideas](https://github.com/jhanstra/snipster/projects/1), [issues](https://github.com/jhanstra/snipster/issues/new), [pull requests](https://github.com/jhanstra/snipster/pulls), etc.

If you find value in snipster please feel free to [buy me a ☕](https://www.paypal.me/jhanstra/4) :)

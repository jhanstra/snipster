# ✂️ Snipster

### Text editor snippets are finally easy enough to manage

✅Add snippets to all of your text editors at once
✅Add a snippet with a simple command: `npx snipster add <snippet-name>`
✅Write and arrange your snippets by topic, or any way you wish
✅Keep your snippets in one place, for example in your Dotfiles repo if you have one
✅Make a snippet available in all language scopes by using the special `.all` extension
✅Support for tabstops and placeholders
✅Sync your pre-existing snippets to Snipster
✅Migrate from one editor to another easily with Snipster
🙅‍♀️No more hand-editing 1000-line JSON/CSON/XML files
🙅‍♀️No more looking up the language scope keyword for each editor
🙅‍♀️No more quoting every line of the snippet, escaping characters, or arranging the lines in an array

## Install & Set-up

```
npx snipster
-- or --
yarn global add snipster && snipster
-- or --
npm install -g snipster && snipster
```

## How It Works

Write snippets as you would normally write code - don't worry about wrangling them into a json or xml object, rewriting them for every text editor you use, quoting every single line, escaping tabs and new lines, indenting, etc. Leave all of that complexity for Snipster.

1. The **name** of your snippet file is the **prefix** you use to call it when writing code.
2. The **file extension** of your snippet file is the **language scope** under which the snippet can be used. Get fancy with _multi-scope_ extensions like 'html+md+txt' that will make the snippet available to several scopes, or use _named_ shortcut extensions like 'all' or 'style' to use the snippet in _all_ file types or all similar _style_ file types (css, less, scss), respectively.
3. The **content** of the file is the **snippet body**, exactly what will appear when you type the prefix and tab. You can use tab stop fields ($1, $2) and placeholders (\${1:placeholder}) to give yourself blocks to tab to while using a snippet.

- Snipster gives you a much easier snippet editing experience. Simply run `npx snipster add` from any folder to add a snippet to all of your editors at once, or open your snippets directory and create a file. No more editing json, cson, or xml files and escaping characters. What you see is what you get.

## Examples

Here are a few examples of Snipster files and content. For more examples and inspiration, see the [example directory](https://github.com/jhanstra/snipster/tree/master/examples) or the creator's [snippets directory](https://github.com/jhanstra/dotfiles/tree/master/snippets).

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

Snipster currently supports [VSCode](https://code.visualstudio.com/), [Atom](https://atom.io/), and [Sublime](https://www.sublimetext.com/) on Mac only. Support for Windows and more editors may come at some point, but PRs are welcome. Sublime does not yet support `.style` or custom extensions like `js+html`.

## API

- `snipster init`: Get set up with snipster by telling it where your snippets are (or where you would like them to be located) and which text editors you use. Snipster will transfer over your editors' pre-existing snippets to your new snippets directory.

- `snipster publish [editor(s)]`: Publish all of the snippets in your directory to your text editors. After running this, you should be able to use all of your snippets across any editor.

- `snipster add [snippet name]`: Add a snippet to your directory from the command line and publish to your editors. This will open Vim where you can write the body of the snippet.

- `snipster list`: List all of the snippets in your directory.

- `snipster help`: Alias for `snipster --help`. provides details on how to use snipster.

- list of named extensions:
  - **all**: all languages
  - **style**: css + scss + less + js + jsx + ts + tsx

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

Note that if you want to add this snippet to all of your editors, it's a nightmare. Each editor uses a different config language (JSON, CSON, XML) **and** different property names. Additionally, VSCode requires you to write each line as an item in an array while Atom doesn't, and Sublime requires you to use CDATA since it's XML. In Sublime, you need to look up the correct scope to use, which is the nonintuitive `text.html.markdown`. In Atom, it's `gfm`.

## Migrating Between Editors

Migrating from one editor to another can be a monumental, day- or week- long task. Snipster helps you out by providing an agnostic solution that can ship your snippets to all of your editors.

## Contribute

Contributions are welcome and very helpful. Submit [feature ideas](https://github.com/jhanstra/snipster/projects/1), [issues](https://github.com/jhanstra/snipster/issues/new), [pull requests](https://github.com/jhanstra/snipster/pulls), etc.

If you find value in snipster please feel free to [buy me a ☕](https://www.paypal.me/jhanstra/4) :)

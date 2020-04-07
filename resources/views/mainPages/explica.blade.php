@extends('layouts.header')
@section('header')

    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.0/showdown.js" ></scripts>
    </script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}"/> <!-- faltava essa linha -->


@stop
@section('content')

    <div id="teste" style="margin: 100px 265px;
    border: solid;
    border-color: #5d656d;
    padding: 19px;">

    </div>

<script>
    var converter = new showdown.Converter();
    var md =
        '# Introdução' +
        '\n' +
        'De acordo com o portal da EcoAgro, o agronegócio no Brasil  tem uma expressiva participação na economia ' +
        'do país e representa aproximadamente 22,15% do PIB em 2012. Atualmente o país ocupa notável ' +
        'posição mundial na produção agroindustrial.\n'+
        'O Brasil é um país com vocação natural para o agronegócio devido às suas características e diversidades, principalmente encontradas ' +
        'no clima favorável, no solo, na água, no relevo e na luminosidade.\n' +
        'Com seus 8,5 milhões de km o Brasil é o país mais extenso da América do Sul e o quinto do mundo com potencial de expansão de sua ' +
        'capacidade agrícola sem necessidade de agredir o meio ambiente.\n' +
        '\n' +
        'Algumas das condições mais favorávies para o agronegócio brasileiro são:\n'+
        '* Disponibilidade de terras agricultáveis\n'+
        '* Clima favorável\n'+
        '* Luminosidade\n'+
        '\n'+
        'Alguns dos maiores desafios a serem vencidos por esse setor são:\n'+
        '* Infraestrutura e logística\n'+
        '* Recursos financeiros inadequados \n'+
        '* Gestão empresarial \n'+
        '\n'+
        '## O Portal do Agronegócio\n' +
        'O Portal do Agronegócio tem o objetivo de colher os dados das bases mais importantes do Brasil e transformá-los em preciosas\n' +
        'informações, tanto para os investidores quanto para os órgãos públicos que possam se beneficiar a partir da nossa extração de conhecimento' +
        ' dessas bases.\n' +
        '\n' +
        '## Nossa metodologia\n' +
        '\n' +
        '    bower install showdown\n' +
        '\n' +
        '## npm (server-side)\n' +
        '\n' +
        '    npm install showdown\n' +
        '\n' +
        '## CDN\n' +
        '\n' +
        'You can also use one of several CDNs available: \n' +
        '\n' +
        '* rawgit CDN\n' +
        '\n' +
        '        https://cdn.rawgit.com/showdownjs/showdown/<version tag>/dist/showdown.min.js\n' +
        '\n' +
        '* cdnjs\n' +
        '\n' +
        '        https://cdnjs.cloudflare.com/ajax/libs/showdown/<version tag>/showdown.min.js\n' +
        '\n' +
        '\n' +
        '[sd-logo]: https://raw.githubusercontent.com/showdownjs/logo/master/dist/logo.readme.png\n' +
        '[releases]: https://github.com/showdownjs/showdown/releases\n' +
        '[atx]: http://www.aaronsw.com/2002/atx/intro\n' +
        '[setext]: https://en.wikipedia.org/wiki/Setext\n' +
        '\n' +
        '---------\n' +
        '\n' +
        '# Syntax\n' +
        '\n' +
        '\n' +
        '## Table of contents\n' +
        '\n' +
        '- [Introduction](#introduction)\n' +
        '- [Paragraphs](#paragraphs)\n' +
        '- [Headings](#headings)\n' +
        '    * [Atx Style](#atx-style)\n' +
        '    * [Setext style](#setext-style)\n' +
        '    * [Header IDs](#header-ids)\n' +
        '- [Blockquotes](#blockquotes)\n' +
        '- [Bold and Italic](#bold-and-italic)\n' +
        '- [Strikethrough](#strikethrough)\n' +
        '- [Emojis](#emojis)\n' +
        '- [Code formatting](#code-formatting)\n' +
        '    * [Inline formats](#inline-formats)\n' +
        '    * [Multiple lines](#multiple-lines)\n' +
        '- [Lists](#lists)\n' +
        '    * [Unordered lists](#unordered-lists)\n' +
        '    * [Ordered lists](#ordered-lists)\n' +
        '    * [TaskLists (GFM Style)](#tasklists--gfm-style-)\n' +
        '    * [List syntax](#list-syntax)\n' +
        '    * [Nested blocks](#nested-blocks)\n' +
        '    * [Nested lists](#nested-lists)\n' +
        '    * [Nested code blocks](#nested-code-blocks)\n' +
        '- [Links](#links)\n' +
        '    * [Simple](#simple)\n' +
        '    * [Inline](#inline)\n' +
        '    * [Reference Style](#reference-style)\n' +
        '- [Images](#images)\n' +
        '    * [Inline](#inline-1)\n' +
        '    * [Reference Style](#reference-style-1)\n' +
        '    * [Image dimensions](#image-dimensions)\n' +
        '    * [Base64 encoded images](#base64-encoded-images)\n' +
        '- [Tables](#tables)\n' +
        '- [Mentions](#mentions)\n' +
        '- [Handling HTML in markdown documents](#handling-html-in-markdown-documents)\n' +
        '- [Escaping entities](#escaping-entities)\n' +
        '    * [Escaping markdown entities](#escaping-markdown-entities)\n' +
        '    * [Escaping html tags](#escaping-html-tags)\n' +
        '- [Known differences and Gotchas](#known-differences-and-gotchas)\n' +
        '\n' +
        '## Introduction\n' +
        '\n' +
        'Showdown was created by John Fraser as a direct port of the original parser written by markdown\'s creator, John Gruber. Although Showdown has evolved since its inception, in "vanilla mode", it tries to follow the [original markdown spec][md-spec] (henceforth refereed as vanilla) as much as possible. There are, however, a few important differences, mainly due to inconsistencies in the original spec, which we addressed following the author\'s advice as stated in the [markdown\'s "official" newsletter][md-newsletter].\n' +
        '\n' +
        'Showdown also support "extra" syntax not defined in the original spec as opt-in features. This means new syntax elements are not enabled by default and require users to enable them through options.\n' +
        '\n' +
        'This document provides a quick description the syntax supported and the differences in output from the original markdown.pl implementation.\n' +
        '\n' +
        '## Paragraphs\n' +
        '\n' +
        'Paragraphs in Showdown are just **one or more lines of consecutive text** followed by one or more blank lines.\n' +
        '\n' +
        '```md\n' +
        'On July 2, an alien mothership entered Earth\'s orbit and deployed several dozen \n' +
        'saucer-shaped "destroyer" spacecraft, each 15 miles (24 km) wide.\n' +
        '    \n' +
        'On July 3, the Black Knights, a squadron of Marine Corps F/A-18 Hornets, \n' +
        'participated in an assault on a destroyer near the city of Los Angeles.\n' +
        '```\n' +
        '\n' +
        'The implication of the “one or more consecutive lines of text” is that Showdown supports \n' +
        '“hard-wrapped” text paragraphs. This means the following examples produce the same output:\n' +
        '\n' +
        '```md\n' +
        'A very long line of text\n' +
        '```\n' +
        '\n' +
        '```md\n' +
        'A very\n' +
        'long line\n' +
        'of text\n' +
        '```\n' +
        '\n' +
        'If you DO want to add soft line breaks (which translate to `<br>` in HTML) to a paragraph, \n' +
        'you can do so by adding 3 space characters to the end of the line (`  `).\n' +
        '\n' +
        'You can also force every line break in paragraphs to translate to `<br>` (as Github does) by\n' +
        'enabling the option **`simpleLineBreaks`**.\n' +
        '\n' +
        '## Headings\n' +
        '\n' +
        '### Atx Style\n' +
        '\n' +
        'You can create a heading by adding one or more # symbols before your heading text. The number of # you use will determine the size of the heading. This is similar to [**atx style**][atx].\n' +
        '\n' +
        '```md\n' +
        '# The largest heading (an <h1> tag)\n' +
        '## The second largest heading (an <h2> tag)\n' +
        '…\n' +
        '###### The 6th largest heading (an <h6> tag)\n' +
        '```\n' +
        '\n' +
        'The space between `#` and the heading text is not required but you can make that space mandatory by enabling the option **`requireSpaceBeforeHeadingText`**.\n' +
        '\n' +
        'You can wrap the headings in `#`. Both leading and trailing `#` will be removed.\n' +
        '\n' +
        '```md\n' +
        '## My Heading ##\n' +
        '```\n' +
        '\n' +
        'If, for some reason, you need to keep a leading or trailing `#`, you can either add a space or escape it:\n' +
        '\n' +
        '```md\n' +
        '# # My header # #\n' +
        '\n' +
        '#\\# My Header \\# #\n' +
        '```\n' +
        '\n' +
        '### Setext style\n' +
        '\n' +
        'You can also use [**setext style**][setext] headings, although only two levels are available.\n' +
        '\n' +
        '```md\n' +
        'This is an H1\n' +
        '=============\n' +
        '    \n' +
        'This is an H2\n' +
        '-------------\n' +
        '```\n' +
        '\n' +
        '**Note:**    \n' +
        'In live preview editors, when a paragraph is followed by a list it can cause an awkward effect.\n' +
        '\n' +
        '![awkward effect][]\n' +
        '\n' +
        'You can prevent this by enabling the option **`smoothPreview`**.\n' +
        '\n' +
        '### Header IDs\n' +
        '\n' +
        'Showdown generates bookmarks anchors in titles automatically, by adding an id property to an heading.\n' +
        '\n' +
        '```md\n' +
        '# My cool header with ID\n' +
        '```\n' +
        '\n' +
        '```html\n' +
        '<h1 id="mycoolheaderwithid">My cool header with ID</h1>\n' +
        '```\n' +
        '\n' +
        'This behavior can be modified with options:\n' +
        '\n' +
        ' - **`noHeaderId`** disables automatic id generation; \n' +
        ' - **`ghCompatibleHeaderId`** generates header ids compatible with github style (spaces are replaced with dashes and a bunch of non alphanumeric chars are removed)\n' +
        ' - **`prefixHeaderId`** adds a prefix to the generated header ids (either automatic or custom).\n' +
        ' - **`headerLevelStart`** sets the header starting level. For instance, setting this to 3 means that `# header` will be converted to `<h3>`.\n' +
        '\n' +
        'Read the [README.md][readme] for more info\n' +
        '\n' +
        '## Blockquotes\n' +
        '\n' +
        'You can indicate blockquotes with a >.\n' +
        '\n' +
        '```md\n' +
        'In the words of Abraham Lincoln:\n' +
        '    \n' +
        '> Pardon my french\n' +
        '```\n' +
        '\n' +
        'Blockquotes can have multiple paragraphs and can have other block elements inside.\n' +
        '\n' +
        '```md\n' +
        '> A paragraph of text\n' +
        '>\n' +
        '> Another paragraph\n' +
        '>\n' +
        '> - A list\n' +
        '> - with items\n' +
        '```\n' +
        '\n' +
        '## Bold and Italic\n' +
        '\n' +
        'You can make text bold or italic.\n' +
        '\n' +
        '    *This text will be italic*\n' +
        '    **This text will be bold**\n' +
        '\n' +
        'Both bold and italic can use either a \\* or an \\_ around the text for styling. This allows you to combine both bold and italic if needed.\n' +
        '\n' +
        '    **Everyone _must_ attend the meeting at 5 o\'clock today.**\n' +
        '\n' +
        '## Strikethrough\n' +
        '\n' +
        'With the option **`strikethrough`** enabled, Showdown supports strikethrough elements.\n' +
        'The syntax is the same as GFM, that is, by adding two tilde (`~~`) characters around\n' +
        'a word or groups of words.\n' +
        '\n' +
        '```md\n' +
        'a ~~strikethrough~~ element\n' +
        '```\n' +
        '\n' +
        'a ~~strikethrough~~ element\n' +
        '\n' +
        '## Emojis\n' +
        '\n' +
        'Since version 1.8.0, showdown supports github\'s emojis. A complete list of available emojis can be foun [here][emoji list].\n' +
        '\n' +
        '```md\n' +
        'this is a :smile: smile emoji\n' +
        '```\n' +
        '\n' +
        'this is a :smile: smile emoji\n' +
        '\n' +
        '## Code formatting\n' +
        '\n' +
        '### Inline formats\n' +
        '\n' +
        'Use single backticks (`) to format text in a special monospace format. Everything within the backticks appear as-is, with no other special formatting.\n' +
        '\n' +
        '```md\n' +
        'Here\'s an idea: why don\'t we take `SuperiorProject` and turn it into `**Reasonable**Project`.\n' +
        '```\n' +
        '\n' +
        '```html\n' +
        '<p>Here\'s an idea: why don\'t we take <code>SuperiorProject</code> and turn it into <code>**Reasonable**Project</code>.</p>\n' +
        '```\n' +
        '\n' +
        '### Multiple lines\n' +
        '\n' +
        'To create blocks of code you should indent it by four spaces.\n' +
        '\n' +
        '```md\n' +
        '    this is a piece\n' +
        '    of\n' +
        '    code\n' +
        '```\n' +
        '\n' +
        'If the options **`ghCodeBlocks`** is activated (which is by default), you can use triple backticks (```) to format text as its own distinct block.\n' +
        '\n' +
        '    Check out this neat program I wrote:\n' +
        '\n' +
        '    ```\n' +
        '    x = 0\n' +
        '    x = 2 + 2\n' +
        '    what is x\n' +
        '    ```\n' +
        '\n' +
        '## Lists\n' +
        '\n' +
        'Showdown supports ordered (numbered) and unordered (bulleted) lists.\n' +
        '\n' +
        '### Unordered lists\n' +
        '\n' +
        'You can make an unordered list by preceding list items with either a *, a - or a +. Markers are interchangeable too.\n' +
        '\n' +
        '```md\n' +
        '* Item\n' +
        '+ Item\n' +
        '- Item\n' +
        '```\n' +
        '\n' +
        '### Ordered lists\n' +
        '\n' +
        'You can make an ordered list by preceding list items with a number.\n' +
        '\n' +
        '```md\n' +
        '1. Item 1\n' +
        '2. Item 2\n' +
        '3. Item 3\n' +
        '```\n' +
        '\n' +
        'It’s important to note that the actual numbers you use to mark the list have no effect on the HTML output Showdown produces. So you can use the same number in all items if you wish to.\n' +
        '\n' +
        '### TaskLists (GFM Style)\n' +
        '\n' +
        'Showdown also supports GFM styled takslists if the **`tasklists`** option is enabled.\n' +
        '\n' +
        '```md\n' +
        ' - [x] checked list item\n' +
        ' - [ ] unchecked list item\n' +
        '``` \n' +
        '\n' +
        ' - [x] checked list item\n' +
        ' - [ ] unchecked list item\n' +
        '\n' +
        '### List syntax\n' +
        '\n' +
        'List markers typically start at the left margin, but may be indented by up to three spaces. \n' +
        '\n' +
        '```md\n' +
        '   * this is valid\n' +
        '   * this is too  \n' +
        '```\n' +
        '\n' +
        'List markers must be followed by one or more spaces or a tab.\n' +
        '\n' +
        'To make lists look nice, you can wrap items with hanging indents:\n' +
        '\n' +
        '```md\n' +
        '*   Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n' +
        '    Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi,\n' +
        '    viverra nec, fringilla in, laoreet vitae, risus.\n' +
        '*   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.\n' +
        '    Suspendisse id sem consectetuer libero luctus adipiscing.\n' +
        '```\n' +
        '\n' +
        'But if you want to be lazy, you don’t have to\n' +
        '\n' +
        'If one list item is separated by a blank line, Showdown will wrap all the list items in `<p>` tags in the HTML output.\n' +
        'So this input:\n' +
        '\n' +
        '```md\n' +
        '* Bird\n' +
        '\n' +
        '* Magic\n' +
        '* Johnson\n' +
        '```\n' +
        '\n' +
        'Results in:\n' +
        '\n' +
        '```html\n' +
        '<ul>\n' +
        '<li><p>Bird</p></li>\n' +
        '<li><p>Magic</p></li>\n' +
        '<li><p>Johnson</p></li>\n' +
        '</ul>\n' +
        '```\n' +
        '\n' +
        'This differs from other markdown implementations such as GFM (github) or commonmark.  \n' +
        '\n' +
        '### Nested blocks\n' +
        '\n' +
        'List items may consist of multiple paragraphs. Each subsequent paragraph in a list item must be indented by either 4 spaces or one tab:\n' +
        '\n' +
        '```md\n' +
        '1.  This is a list item with two paragraphs. Lorem ipsum dolor\n' +
        '    sit amet, consectetuer adipiscing elit. Aliquam hendrerit\n' +
        '    mi posuere lectus.\n' +
        '\n' +
        '    Vestibulum enim wisi, viverra nec, fringilla in, laoreet\n' +
        '    vitae, risus. Donec sit amet nisl. Aliquam semper ipsum\n' +
        '    sit amet velit.\n' +
        '\n' +
        '2.  Suspendisse id sem consectetuer libero luctus adipiscing.\n' +
        '```\n' +
        '\n' +
        'This is valid for other block elements such as blockquotes:\n' +
        '\n' +
        '```md\n' +
        '*   A list item with a blockquote:\n' +
        '\n' +
        '    > This is a blockquote\n' +
        '    > inside a list item.\n' +
        '```\n' +
        '\n' +
        'or event other lists.\n' +
        '\n' +
        '### Nested lists\n' +
        '\n' +
        'You can create nested lists by indenting list items by **four** spaces.\n' +
        '\n' +
        '```md\n' +
        '1.  Item 1\n' +
        '    1. A corollary to the above item.\n' +
        '    2. Yet another point to consider.\n' +
        '2.  Item 2\n' +
        '    * A corollary that does not need to be ordered.\n' +
        '    * This is indented four spaces\n' +
        '    * You might want to consider making a new list.\n' +
        '3.  Item 3\n' +
        '```\n' +
        '\n' +
        'This behavior is consistent with the original spec but differs from other implementations such as GFM or commonmark. Prior to version 1.5, you just needed to indent two spaces for it to be considered a sublist.\n' +
        'You can disable the **four spaces requirement** with option **`disableForced4SpacesIndentedSublists`**\n' +
        '\n' +
        'To nest a third (or more) sublist level, you need to indent 4 extra spaces (or 1 extra tab) for each level.\n' +
        '\n' +
        '```md\n' +
        '1.  level 1\n' +
        '    1.  Level 2\n' +
        '        *   Level 3\n' +
        '    2.  level 2\n' +
        '        1.  Level 3\n' +
        '1.  Level 1\n' +
        '```\n' +
        '\n' +
        '### Nested code blocks\n' +
        '\n' +
        'You can nest fenced codeblocks the same way you nest other block elements, by indenting by fours spaces or a tab:\n' +
        '\n' +
        '```md\n' +
        '1.  Some code:\n' +
        '\n' +
        '    ```js\n' +
        '    var foo = \'bar\';\n' +
        '    console.log(foo);\n' +
        '    ```\n' +
        '```\n' +
        '\n' +
        'To put a *indented style* code block within a list item, the code block needs to be indented twice — 8 spaces or two tabs:\n' +
        '\n' +
        '```md\n' +
        '1.  Some code:\n' +
        '\n' +
        '    var foo = \'bar\';\n' +
        '    console.log(foo);\n' +
        '```\n' +
        '\n' +
        '## Links\n' +
        '\n' +
        '### Simple\n' +
        '\n' +
        'If you wrap a valid URL or email in `<>` it will be turned into a link whose text is the link itself.\n' +
        '\n' +
        '```md\n' +
        'link to <http://www.google.com/>\n' +
        '\n' +
        'this is my email <somedude@mail.com>\n' +
        '```\n' +
        '\n' +
        'In the case of email addreses, Showdown will also perform a bit of randomized decimal and hex entity-encoding to help obscure your address from address-harvesting spambots.\n' +
        'You can disable this obfuscation setting **`encodeEmails`** option to `false`.\n' +
        '\n' +
        'With the option **`simplifiedAutoLink`** enabled, Showdown will automagically turn every valid URL it finds in the text body to links for you, without the need to wrap them in `<>`.\n' +
        '\n' +
        '```md\n' +
        'link to http://www.google.com/\n' +
        '\n' +
        'this is my email somedude@mail.com\n' +
        '```\n' +
        '\n' +
        '### Inline\n' +
        '\n' +
        'You can create an inline link by wrapping link text in brackets ( `[ ]` ), and then wrapping the link in parentheses ( `( )` ).\n' +
        '\n' +
        'For example, to create a hyperlink to github.com/showdownjs/showdown, with a link text that says, Get Showdown!, you\'d write this in Markdown: `[Get Showdown!](https://github.com/showdownjs/showdown)`.\n' +
        '\n' +
        '### Reference Style\n' +
        '\n' +
        'You can also use the reference style, like this:\n' +
        '\n' +
        '```md\n' +
        'this is a [link to google][1]\n' +
        '\n' +
        '[1]: www.google.com\n' +
        '```\n' +
        '\n' +
        'Showdown also supports implicit link references:\n' +
        '\n' +
        '```md\n' +
        'this is a link to [google][]\n' +
        '\n' +
        '[google]: www.google.com\n' +
        '```\n' +
        '\n' +
        '## Images\n' +
        '\n' +
        'Markdown uses an image syntax that is intended to resemble the syntax for links, also allowing for two styles: inline and reference.\n' +
        '\n' +
        '### Inline\n' +
        '\n' +
        'Inline image syntax looks like this:\n' +
        '\n' +
        '```md\n' +
        '![Alt text](url/to/image)\n' +
        '\n' +
        '![Alt text](url/to/image "Optional title")\n' +
        '```\n' +
        '\n' +
        'That is:\n' +
        '\n' +
        ' + An exclamation mark: !;\n' +
        ' + followed by a set of square brackets, containing the alt attribute text for the image;\n' +
        ' + followed by a set of parentheses, containing the URL or path to the image, and an optional title attribute enclosed in double or single quotes.\n' +
        '\n' +
        '\n' +
        '### Reference Style\n' +
        '\n' +
        'Reference-style image syntax looks like this:\n' +
        '\n' +
        '```md\n' +
        '![Alt text][id]\n' +
        '```\n' +
        '\n' +
        'Where “id” is the name of a defined image reference. Image references are defined using syntax identical to link references:\n' +
        '\n' +
        '```md\n' +
        '[id]: url/to/image  "Optional title attribute"\n' +
        '```\n' +
        '\n' +
        'Implicit references are also supported in images, similar to what happens with links:\n' +
        '\n' +
        '```md\n' +
        '![showdown logo][]\n' +
        '\n' +
        '[showdown logo]: http://showdownjs.github.io/demo/img/editor.logo.white.png\n' +
        '```\n' +
        '\n' +
        '### Image dimensions\n' +
        '\n' +
        'When the option **`parseImgDimension`** is activated, you can also define the image dimensions, like this:\n' +
        '\n' +
        '```md\n' +
        '![Alt text](url/to/image =250x250 "Optional title")\n' +
        '```\n' +
        '\n' +
        'or in reference style:\n' +
        '\n' +
        '```md\n' +
        '![Alt text][id]\n' +
        '\n' +
        '[id]: url/to/image =250x250\n' +
        '```\n' +
        '\n' +
        '### Base64 encoded images\n' +
        '\n' +
        'Showdown also supports Base64 encoded images, both reference and inline style.\n' +
        '**Since version 1.7.4**, wrapping base64 strings, which are usually extremely long lines of text, is supported.\n' +
        'You can add newlines arbitrarily, as long as they are added after the `,` character.\n' +
        '\n' +
        '**inline style**\n' +
        '```md\n' +
        '![Alt text](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7l\n' +
        'jmRAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAY\n' +
        'SURBVBhXYwCC/2AAZYEoOAMs8Z+BgQEAXdcR7/Q1gssAAAAASUVORK5CYII=)\n' +
        '```\n' +
        '\n' +
        '**reference style**\n' +
        '```md\n' +
        '![Alt text][id]\n' +
        '\n' +
        '[id]:\n' +
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7l\n' +
        'jmRAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7D\n' +
        'AcdvqGQAAAAYSURBVBhXYwCC/2AAZYEoOAMs8Z+BgQEAXdcR7/Q1gssAAAAASUVORK5CYII=\n' +
        '```\n' +
        '\n' +
        'Please note that with reference style base64 image sources, regardless of "wrapping", a double newline is needed after the base64 string to separate them from a paragraph or other text block (but references can be adjacent).\n' +
        '\n' +
        '**wrapped reference style**\n' +
        '```md\n' +
        '![Alt text][id]\n' +
        '![Alt text][id2]\n' +
        '\n' +
        '[id]:\n' +
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7l\n' +
        'jmRAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7D\n' +
        'AcdvqGQAAAAYSURBVBhXYwCC/2AAZYEoOAMs8Z+BgQEAXdcR7/Q1gssAAAAASUVORK5CYII=\n' +
        '[id2]:\n' +
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAIAAAA7l\n' +
        'jmRAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7D\n' +
        'AcdvqGQAAAAYSURBVBhXYwCC/2AAZYEoOAMs8Z+BgQEAXdcR7/Q1gssAAAAASUVORK5CYII=\n' +
        '\n' +
        'this text needs to be separated from the references by 2 newlines\n' +
        '```\n' +
        '\n' +
        '\n' +
        '## Tables\n' +
        '\n' +
        'Tables aren\'t part of the core Markdown spec, but they are part of GFM and Showdown supports them by turning on the option `tables`.\n' +
        '\n' +
        'Colons can be used to align columns.\n' +
        '\n' +
        'In the new version, the outer pipes (`|`) are optional, matching GFM spec. \n' +
        '\n' +
        'You also don\'t need to make the raw Markdown line up prettily.\n' +
        '\n' +
        'You can also use other markdown syntax inside them.\n' +
        '\n' +
        '```md\n' +
        '| Tables        | Are           | Cool  |\n' +
        '| ------------- |:-------------:| -----:|\n' +
        '| **col 3 is**  | right-aligned | $1600 |\n' +
        '| col 2 is      | *centered*    |   $12 |\n' +
        '| zebra stripes | ~~are neat~~  |    $1 |\n' +
        '```\n' +
        '\n' +
        '## Mentions\n' +
        '\n' +
        'Showdown supports github mentions by enabling the option **`ghMentions`**. This will turn every `@username` into a link to their github profile.\n' +
        '\n' +
        '```md\n' +
        'hey @tivie, check this out\n' +
        '```\n' +
        '\n' +
        'Since version 1.6.2 you can customize the generated link in mentions with the option **`ghMentionsLink`**.\n' +
        'For instance, setting this option to `http://mysite.com/{u}/profile`:\n' +
        '\n' +
        '```html\n' +
        '<p>hey <a href="http://mysite.com/tivie/profile">@tivie</a>, check this out</p>\n' +
        '```\n' +
        '\n' +
        '## Handling HTML in markdown documents\n' +
        '\n' +
        'Showdown, in most cases, leaves HTML tags alone, leaving them untouched in the output document.\n' +
        '\n' +
        '```md\n' +
        'some markdown **here**\n' +
        '<div>this is *not* **parsed**</div>\n' +
        '```\n' +
        '\n' +
        '```html\n' +
        '<p>some markdown <strong>here</strong></p>\n' +
        '<div>this is *not* **parsed**</div>\n' +
        '```\n' +
        '\n' +
        'However, there are exceptions to this. With `<code>` and `<pre><code>` tags, their contents are always escaped.\n' +
        '\n' +
        '```md\n' +
        'some markdown **here** with <code>foo & bar <baz></baz></code>\n' +
        '```\n' +
        '\n' +
        ' ```html\n' +
        '<p>some markdown <strong>here</strong> with <code>foo &amp; bar &lt;baz&gt;&lt;/baz&gt;</code></p>\n' +
        '``` \n' +
        '\n' +
        'If you wish to enable markdown parsing inside a specific HTML tag, you can enable it by using the html attribute **`markdown`** or  **`markdown="1"`**  or **`data-markdown="1"`**.\n' +
        '\n' +
        '```md\n' +
        'some markdown **here**\n' +
        '<div markdown="1">this is *not* **parsed**</div>\n' +
        '```\n' +
        '\n' +
        '```html\n' +
        '<p>some markdown <strong>here</strong></p>\n' +
        '<div markdown="1"><p>this is <em>not</em> <strong>parsed</strong></p></div>\n' +
        '```\n' +
        '\n' +
        '## Escaping entities\n' +
        '\n' +
        '### Escaping markdown entities\n' +
        '\n' +
        'Showdown allows you to use backslash (`\\`) escapes to generate literal characters which would otherwise have special meaning in markdown’s syntax. For example, if you wanted to surround a word with literal underscores (instead of an HTML `<em>` tag), you can use backslashes before the unserscores, like this:\n' +
        '\n' +
        '```md\n' +
        '\\_literal underscores\\_\n' +
        '```\n' +
        '\n' +
        'Showdown provides backslash escapes for the following characters:\n' +
        '\n' +
        '```\n' +
        '\\   backslash\n' +
        '`   backtick\n' +
        '*   asterisk\n' +
        '_   underscore\n' +
        '{}  curly braces\n' +
        '[]  square brackets\n' +
        '()  parentheses\n' +
        '#   hash mark\n' +
        '+   plus sign\n' +
        '-   minus sign (hyphen)\n' +
        '.   dot\n' +
        '!   exclamation mark\n' +
        '```\n' +
        '\n' +
        '### Escaping HTML tags\n' +
        '\n' +
        'Since [version 1.7.2](https://github.com/showdownjs/showdown/tree/1.7.2) backslash escaping HTML tags is supported when `backslashEscapesHTMLTags` option is enabled.\n' +
        '\n' +
        '```md\n' +
        '\\<div>a literal div\\</div>\n' +
        '``` \n' +
        '\n' +
        '## Known differences and Gotchas\n' +
        '\n' +
        'In most cases, Showdown\'s output is identical to that of Perl Markdown v1.0.2b7.  What follows is a list of all known deviations.  Please file an issue if you find more.\n' +
        '\n' +
        '* **Since version 1.4.0, showdown supports the markdown="1" attribute**, but for older versions, this attribute is ignored. This means:\n' +
        '\n' +
        '        <div markdown="1">\n' +
        '             Markdown does *not* work in here.\n' +
        '        </div>\n' +
        '\n' +
        '\n' +
        '* You can only nest square brackets in link titles to a depth of two levels:\n' +
        '\n' +
        '        [[fine]](http://www.github.com/)\n' +
        '        [[[broken]]](http://www.github.com/)\n' +
        '\n' +
        '    If you need more, you can escape them with backslashes.\n' +
        '\n' +
        '\n' +
        '* A list is **single paragraph** if it has only **1 line-break separating items** and it becomes **multi paragraph if ANY of its items is separated by 2 line-breaks**:\n' +
        '\n' +
        '   ```md\n' +
        '    - foo\n' +
        '   \n' +
        '    - bar\n' +
        '    - baz\n' +
        '   ```\n' +
        '   becomes\n' +
        '\n' +
        '    ```html\n' +
        '    <ul>\n' +
        '      <li><p>foo</p></li>\n' +
        '      <li><p>bar</p></li>\n' +
        '      <li><p>baz</p></li>\n' +
        '    </ul>\n' +
        '    ```\n' +
        '\n' +
        'This new ruleset is based on the comments of Markdown\'s author John Gruber in the [Markdown discussion list][md-newsletter].\n' +
        '\n' +
        '[md-spec]: http://daringfireball.net/projects/markdown/\n' +
        '[md-newsletter]: https://pairlist6.pair.net/mailman/listinfo/markdown-discuss\n' +
        '[atx]: http://www.aaronsw.com/2002/atx/intro\n' +
        '[setext]: https://en.wikipedia.org/wiki/Setext\n' +
        '[readme]: https://github.com/showdownjs/showdown/blob/master/README.md\n' +
        '[awkward effect]: http://i.imgur.com/YQ9iHTL.gif\n' +
        '[emoji list]: https://github.com/showdownjs/showdown/wiki/emojis';
    var html = converter.makeHtml(md);
    console.log(html);
    document.getElementById('teste').innerHTML = html;
</script>



@endsection

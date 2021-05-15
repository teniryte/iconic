[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/teniryte/esbuild-xyaml-plugin/graphs/commit-activity) [![Maintaner](https://img.shields.io/badge/Maintainer-teniryte-blue)](https://img.shields.io/badge/maintainer-teniryte-blue) [![Website shields.io](https://img.shields.io/website-up-down-green-red/http/shields.io.svg)](https://esbuild-xyaml-plugin.sencort.com/) [![made-with-Markdown](https://img.shields.io/badge/Made%20with-Markdown-1f425f.svg)](http://commonmark.org) [![made-for-VSCode](https://img.shields.io/badge/Made%20for-VSCode-1f425f.svg)](https://code.visualstudio.com/) [![GitHub license](https://img.shields.io/github/license/teniryte/esbuild-xyaml-plugin.svg)](https://github.com/teniryte/esbuild-xyaml-plugin/blob/master/LICENSE) [![Profile views](https://gpvc.arturio.dev/teniryte)](https://gpvc.arturio.dev/teniryte) [![GitHub contributors](https://img.shields.io/github/contributors/teniryte/esbuild-xyaml-plugin.svg)](https://GitHub.com/teniryte/esbuild-xyaml-plugin/graphs/contributors/) [![GitHub issues](https://img.shields.io/github/issues/teniryte/esbuild-xyaml-plugin.svg)](https://GitHub.com/teniryte/esbuild-xyaml-plugin/issues/)

[![GitHub forks](https://img.shields.io/github/forks/teniryte/esbuild-xyaml-plugin.svg?style=social&label=Fork&maxAge=2592000)](https://GitHub.com/teniryte/esbuild-xyaml-plugin/network/) [![GitHub stars](https://img.shields.io/github/stars/teniryte/esbuild-xyaml-plugin.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/teniryte/esbuild-xyaml-plugin/stargazers/) [![GitHub watchers](https://img.shields.io/github/watchers/teniryte/esbuild-xyaml-plugin.svg?style=social&label=Watch&maxAge=2592000)](https://GitHub.com/teniryte/esbuild-xyaml-plugin/watchers/) [![GitHub followers](https://img.shields.io/github/followers/teniryte.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/teniryte?tab=followers)

# iconic

Tools for SVG icons

## Installation

```bash
npm install iconic
```

## Using

### CLI

```bash
iconic --output=bundle.js --element=ui-icon icons/*
```

### Node

**Compiling client script:**

```js
const iconic = require('iconic');

// Bundles all icons and renders script with webcomponent named 'ui-icon' definition
let bundle = iconic.bundle('ui-icon', {
  icon1: svg,
  icon2: svg,
  icon3: svg,
});
```

**Using icons:**

```html
<script src="/path/to/bundle.js"></script>

<h1>
  <i><ui-icon name="icon1" /></i>
  <span>Iconic</span>
</h1>
```

## API

### Iconic

```js
const iconic = require('iconic');

// Bundles all icons and renders script with webcomponent named 'ui-icon' definition
let bundle = iconic.bundle('ui-icon', {
  icon1: svg,
  icon2: svg,
  icon3: svg,
});

// Bundles all files in directory
let bundle = iconic.directoryBundle('ui-icon', dirname);

// Creating icon
let icon = iconic.createIcon(source, name);
```

### Icon

```js
const iconic = require('iconic');

let icon = iconic.createIcon(source, name);

// Is icon colored
icon.isColored();

// Get [width, height] size
icon.getSize();

icon
  // Set monocolored icon color
  .setColor('#ff0000')
  // Resize icon
  .resize(100, 100)
  // Clear SVG code
  .clear()
  // Clear, optimize and set width and height to 100
  .normalize()
  // Write icon to file
  .save('icon.svg');

// Export as PNG
icon.toPNG().then(data => fs.writeFileSync('icon.png', data));

// Export as JPEG
icon.toJPEG(backgroundColor).then(data => fs.writeFileSync('icon.jpeg', data));
```

### Pack

```js
const iconic = require('iconic');

let pack = new iconic.Pack();

// Add instance of Icon to pack
pack.addIcon(icon);

// Returns plain object with icon names as keys and svg code as values
pack.toJSON();

// Creates script with icons and webcomponent to display icons
pack.bundle((elementName = 'ui-icon'));

// Is pack contains colored icons
pack.isColored();
```

### DevPlugins

- `ooi`;

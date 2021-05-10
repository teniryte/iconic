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

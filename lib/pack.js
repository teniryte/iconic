'use strict';

const _ = require('ooi');
const path = require('path');
const fs = require('fs');

class Pack {
  constructor() {
    this.icons = [];
  }

  isColored() {
    return !!this.icons.find(icon => icon.isColored());
  }

  addIcon(icon) {
    this.icons.push(icon);
  }

  toJSON() {
    let data = {};
    this.icons.forEach(icon => {
      data[icon.name] = icon.normalize().source;
    });
    return data;
  }

  bundle(elementName = 'ui-icon', onlyIcons = false) {
    if (onlyIcons) return this.toJSON();
    return Pack.render(elementName, this.toJSON());
  }

  static render(elementName = 'ui-icon', icons = {}) {
    let code = fs
      .readFileSync(path.resolve(__dirname, '../templates/bundle.js'), 'utf-8')
      .replace("'{{icons}}'", JSON.stringify(icons))
      .replace('{{elementName}}', elementName);
    return code;
  }
}

module.exports = Pack;

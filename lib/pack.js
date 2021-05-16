'use strict';

const _ = require('ooi');
const path = require('path');
const fs = require('fs');

let template = fs.readFileSync(
  path.resolve(__dirname, '../templates/bundle.js'),
  'utf-8'
);

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
      data[icon.name] = icon.normalize().source.replace(/fill\:\#000\;/gim, '');
    });
    return data;
  }

  bundle(elementName = 'ui-icon') {
    let code = template
      .replace("'{{icons}}'", JSON.stringify(this.toJSON()))
      .replace('{{elementName}}', elementName);
    return code;
  }
}

module.exports = Pack;

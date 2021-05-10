'use strict';

const _ = require('ooi');
const Icon = require('./icon');
const Pack = require('./pack');
const fs = require('fs');
const path = require('path');

module.exports = {
  bundle,
  createIcon,
  directoryBundle,
  Icon,
  Pack,
};

function bundle(elementName = 'ui-icon', data = {}) {
  let pack = new Pack();
  _.each(data, (svg, name) => {
    let icon = new Icon(svg, name);
    pack.addIcon(icon);
  });
  return pack.bundle(elementName);
}

function createIcon(source = '<svg />', name = 'icon') {
  return new Icon(source, name);
}

function directoryBundle(elementName = 'ui-icon', dir) {
  let files = fs.readdirSync(dir),
    pack = new Pack();
  files.forEach(file => {
    let filename = path.resolve(dir, file),
      source = fs.readFileSync(filename, 'utf-8'),
      name = path.basename(file, path.extname(file)),
      icon = new Icon(source, name);
    pack.addIcon(icon);
  });
  return pack.bundle(elementName);
}

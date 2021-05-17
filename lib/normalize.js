'use strict';

const _ = require('ooi');
const Icon = require('./icon');
const Pack = require('./pack');
const fs = require('fs');
const path = require('path');
const { optimize } = require('svgo');

module.exports = normalize;

function normalize(source) {
  return optimize(
    source
      .replace(/fill\=\"#000000\"/gim, '')
      .replace(/fill\=\"#000\"/gim, '')
      .replace(/fill\:\#000\;/gim, '')
      .replace(new RegExp(100 + 'pt', 'mgi'), 100 + 'px')
      .replace(new RegExp(100 + 'pt', 'mgi'), 100 + 'px')
      .replace(/surface(\d+)/gim, 'surface1')
      .replace(
        'width="100" height="100"',
        'width="100" height="100" viewBox="0 0 100 100"'
      ),
    {
      multipass: true,
    }
  ).data;
}

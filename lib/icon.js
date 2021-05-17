'use strict';

const _ = require('ooi');
const fs = require('fs');
const { optimize } = require('svgo');
const toPNG = require('convert-svg-to-png');
const toJPEG = require('convert-svg-to-jpeg');
const normalize = require('./normalize');

class Icon {
  constructor(source = '<svg />', name = 'icon') {
    this.source = source;
    this.name = name;
  }

  // Getters

  isColored() {
    return this.removeBlackFills().source.includes('fill="');
  }

  getSize() {
    return [
      +this.source.split('width="')[1].split('"')[0],
      +this.source.split('height="')[1].split('"')[0],
    ];
  }

  // Export

  async toPNG() {
    let png = await toPNG.convert(this.normalize().source);
    return png;
  }

  async toJPEG(background = '#ffffff') {
    let jpeg = await toJPEG.convert(this.normalize().source, {
      background,
    });
    return jpeg;
  }

  // Setters

  normalize() {
    this.source = normalize(this.source);
    return this;
  }

  removeBlackFills() {
    this.source = this.source
      .replace(/fill\=\"#000000\"/gim, '')
      .replace(/fill\=\"#000\"/gim, '')
      .replace(/fill\:\#000\;/gim, '');
    return this;
  }

  setColor(val) {
    let source = this.source;
    if (source.indexOf('fill:') > -1) {
      source = source.replace(
        /fill\s*\:\s*([^\'\"\;]+)[\;\'\"]/,
        (txt, val) => {
          return `fill:${val}`;
        }
      );
    } else {
      source = source.replace('<g ', `<g style="fill:${val}" `);
    }
    this.source = source;
    return this;
  }

  setBackgroundColor(val) {
    let source = this.source;
    if (source.indexOf('fill:') > -1) {
      source = source.replace(
        /background\s*\:\s*([^\'\"\;]+)[\;\'\"]/,
        (txt, val) => {
          return `fill:${val}`;
        }
      );
      source = source.replace(
        /background-color\s*\:\s*([^\'\"\;]+)[\;\'\"]/,
        (txt, val) => {
          return `fill:${val}`;
        }
      );
    } else {
      source = source.replace('<g ', `<g style="background:${val}" `);
      source = source.replace('<g ', `<g style="background-color:${val}" `);
    }
    this.source = source;
    return this;
  }

  resize(width = 100, height = 100) {
    this.source = this.source
      .replace(new RegExp(width + 'pt', 'mgi'), width + 'px')
      .replace(new RegExp(height + 'pt', 'mgi'), height + 'px')
      .replace(/surface(\d+)/gim, 'surface1');
    return this;
  }

  save(filename) {
    fs.writeFileSync(filename, this.source);
    return this;
  }

  clear() {
    const result = optimize(this.source, {
      multipass: true,
    });
    const optimizedSvgString = result.data;
    this.source = optimizedSvgString;
    return this;
  }
}

module.exports = Icon;

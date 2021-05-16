'use strict';

const _ = require('ooi');
const fs = require('fs');
const SVGO = require('svgo-sync');
const toPNG = require('convert-svg-to-png');
const toJPEG = require('convert-svg-to-jpeg');

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
    this.resize(100, 100).removeBlackFills();
    return this;
  }

  removeBlackFills() {
    this.source = this.source
      .replace(/fill\=\"#000000\"/gim, '')
      .replace(/fill\=\"#000\"/gim, '');
    return this;
  }

  setColor(color) {
    this.removeBlackFills();
    this.source = this.source.replace('<svg', `<svg fill="${color}"`);
    return this;
  }

  resize(width = 100, height = 100) {
    this.source = this.source
      .replace(/width=".+?"/gim, `width="${width}"`)
      .replace(/height=".+?"/gim, `height="${width}"`);
    return this;
  }

  save(filename) {
    fs.writeFileSync(filename, this.source);
    return this;
  }

  clear() {
    let svgo = new SVGO({
      plugins: [
        { cleanupAttrs: true },
        { removeDoctype: true },
        { removeXMLProcInst: true },
        { removeComments: true },
        { removeMetadata: true },
        { removeTitle: true },
        { removeDesc: true },
        { removeUselessDefs: true },
        { removeEditorsNSData: true },
        { removeEmptyAttrs: true },
        { removeHiddenElems: true },
        { removeEmptyText: true },
        { removeEmptyContainers: true },
        { removeViewBox: false },
        { cleanupEnableBackground: true },
        { convertStyleToAttrs: true },
        { convertColors: true },
        { convertPathData: true },
        { convertTransform: true },
        { removeUnknownsAndDefaults: true },
        { removeNonInheritableGroupAttrs: true },
        { removeUselessStrokeAndFill: true },
        { removeUnusedNS: true },
        { cleanupIDs: true },
        { cleanupNumericValues: true },
        { moveElemsAttrsToGroup: true },
        { moveGroupAttrsToElems: true },
        { collapseGroups: true },
        { removeRasterImages: false },
        { mergePaths: true },
        { convertShapeToPath: true },
        { sortAttrs: true },
        { removeDimensions: true },
        { removeAttrs: { attrs: '(stroke|fill)' } },
      ],
    });
    this.source = svgo
      .optimizeSync(this.source)
      .data.replace(/id=".+?"/gim, '')
      .replace(/enable-background=".+?"/gim, '');

    return this;
  }
}

module.exports = Icon;

// @ts-nocheck

(function (global) {
  if (global.iconic) return;

  class Iconic {
    icons = {};
    packs = {};
    packsNames = [];

    async init() {}

    async load() {}

    async getPackIcons(packName) {
      let icons = await this.loadPack(packName);
      return Object.keys(icons);
    }

    async searchIcons(text) {
      if (text.length < 3) return [];
      let url = `/api/search/?text=${encodeURIComponent(text)}`,
        response = await fetch(url),
        data = await response.json(),
        icons = data.results;
      return icons;
    }

    async getPacksNames() {
      let url = `/api/list/`,
        response = await fetch(url),
        data = await response.json(),
        packsNames = data.packs;
      this.packsNames = packsNames;
      return packsNames;
    }

    async loadPack(packName, isArray = false) {
      if (this.packs[packName]) {
        let icons = this.packs[packName];
        Object.assign(this.icons, icons);
        return isArray ? this.toArray(icons) : icons;
      }
      let url = `/api/pack/${packName}/`,
        response = await fetch(url),
        data = await response.json(),
        icons = data.icons;
      Object.assign(this.icons, icons);
      this.packs[packName] = icons;
      return isArray ? this.toArray(icons) : icons;
    }

    async getIconCode(iconName) {
      if (this.icons[iconName]) return this.icons[iconName];
      let packName =
        iconName.split('.').length === 2 ? iconName.split('.')[0] : null;
      if (packName) {
        await this.loadPack(packName);
      }
      return this.icons[iconName];
    }

    define(...args) {
      IconElement.define(...args);
    }

    toArray(icons) {
      return Object.keys(icons).map(key => ({
        name: key,
        source: icons[key],
      }));
    }

    color(name = 'white') {
      return {
        white: 'hsl(0, 0%, 100%)',
        black: 'hsl(0, 0%, 4%)',
        light: 'hsl(0, 0%, 96%)',
        dark: 'hsl(0, 0%, 21%)',
        primary: 'hsl(171, 100%, 41%)',
        link: 'hsl(217, 71%, 53%)',
        info: 'hsl(204, 86%, 53%)',
        success: 'hsl(141, 71%, 48%)',
        warning: 'hsl(48, 100%, 67%)',
        danger: 'hsl(348, 100%, 61%)',

        black: 'hsl(0, 0%, 4%)',
        blackBis: 'hsl(0, 0%, 7%)',
        blackTer: 'hsl(0, 0%, 14%)',
        greyDarker: 'hsl(0, 0%, 21%)',
        greyDark: 'hsl(0, 0%, 29%)',
        grey: 'hsl(0, 0%, 48%)',
        greyLight: 'hsl(0, 0%, 71%)',
        greyLighter: 'hsl(0, 0%, 86%)',
        whiteTer: 'hsl(0, 0%, 96%)',
        whiteBis: 'hsl(0, 0%, 98%)',
        white: 'hsl(0, 0%, 100%)',
        orange: 'hsl(14, 100%, 53%)',
        yellow: 'hsl(48, 100%, 67%)',
        green: 'hsl(141, 71%, 48%)',
        turquoise: 'hsl(171, 100%, 41%)',
        cyan: 'hsl(204, 86%, 53%)',
        blue: 'hsl(217, 71%, 53%)',
        purple: 'hsl(271, 100%, 71%)',
        red: 'hsl(348, 100%, 61%)',

        jeans: '#5D9CEC',
        Jeans: '#4A89DC',

        aqua: '#4FC1E9',
        Aqua: '#3BAFDA',

        mint: '#48CFAD',
        Mint: '#37BC9B',

        grass: '#A0D468',
        Grass: '#8CC152',

        sun: '#FFCE54',
        Sun: '#F6BB42',

        amber: '#FC6E51',
        Amber: '#E9573F',

        grape: '#ED5565',
        Grape: '#DA4453',

        lavender: '#AC92EC',
        Lavender: '#967ADC',

        rose: '#EC87C0',
        Rose: '#D770AD',

        lightGrey: '#F5F7FA',
        LightGrey: '#E6E9ED',

        mediumGrey: '#CCD1D9',
        MediumGrey: '#AAB2BD',

        darkGrey: '#656D78',
        DarkGrey: '#434A54',
      }[name];
    }
  }

  const iconic = (global.iconic = new Iconic());

  iconic.init();

  document.addEventListener('DOMContentLoaded', ev => {
    iconic.load();
  });

  class IconElement extends HTMLElement {
    static observedAttributes = ['icon'];
    static elementName = null;
    static pack = '';

    static define(elementName = null, pack = '') {
      new Function(
        'Parent',
        'elementName',
        'pack',
        `class ChildIcon extends Parent { static elementName = elementName || Parent.elementName; static pack = pack || Parent.pack; }; customElements.define(elementName, ChildIcon);`
      )(this, elementName, pack);
    }

    constructor(...args) {
      super(...args);
    }

    get Class() {
      return this.constructor;
    }

    getIconName() {
      return this.getAttribute('icon');
    }

    connectedCallback() {
      this.setAttribute('class', `iconic-icon`);
    }

    async render() {
      let iconName = this.Class.pack
          ? `${this.Class.pack}.${iconName}`
          : this.getIconName(),
        code = await iconic.getIconCode(iconName);
      this.innerHTML = code.replace('<svg', '<svg viewBox="0 0 100 100"');
      Object.assign(this.style, {
        display: 'inline-block',
        fill: 'inherit',
        width: '1em',
        height: '1em',
        marginRight: '5px',
      });
      Object.assign(this.children[0].style, {
        width: '100%',
        height: '100%',
        fill: 'inherit',
      });
    }

    attributeChangedCallback(name, oldValue, newValue) {
      this.render();
    }
  }
})(window);

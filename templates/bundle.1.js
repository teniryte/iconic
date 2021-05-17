// @ts-nocheck
(function (global) {
  if (global.iconic) return;

  class Iconic {
    icons = {};
    mods = {};
    search = {};
    packs = [];

    async init() {
      this.defineLoaderClass();
    }

    async load() {
      await this.applyStyles();
      await this.loadIcons();
      await this.defineIconClasses();
    }

    async defineIconClasses() {
      Object.keys(this.mods).forEach(elementName => {
        this.defineIconClass(elementName);
      });
    }

    async loadIcons() {
      let packs = [];
      Object.keys(this.mods).forEach(elementName => {
        packs = [...packs, ...this.mods[elementName].packs];
      });
      packs = Array.from(new Set(packs));
      for (let i = 0; i < packs.length; i++) {
        let packName = packs[i];
        await this.loadPackIcons(packName);
      }
    }

    getIconsNames(elementName) {
      let mod = this.mods[elementName],
        names = [];
      Object.keys(this.icons).filter(key => {
        let pack = key.split('.')[0];
        if (!mod.packs.includes(pack)) return;
        names.push(mod.isShort ? key.split('.').slice(1).join('.') : key);
      });
      return names;
    }

    addMod(elementName, packs, isShort = false) {
      this.mods[elementName] = {
        elementName: elementName,
        packs: packs,
        isShort: isShort,
      };
    }

    getIconCode(elementName, name) {
      let mod = this.mods[elementName];
      if (mod.isShort) {
        return this.icons[
          mod.packs
            .map(packName => `${packName}.${name}`)
            .filter(name => !!this.icons[name])[0]
        ];
      }
      return this.icons[name];
    }

    defineLoaderClass() {
      class IconicLoader extends HTMLElement {
        static get observedAttributes() {
          return ['element', 'packs', 'short'];
        }

        constructor(...args) {
          super(...args);

          this.attrs = {};
        }

        attributeChangedCallback(name, oldValue, value) {
          this.attrs[name] = value;
        }

        connectedCallback() {
          iconic.addMod(
            this.attrs.element,
            this.attrs.packs.split(' '),
            this.attrs.short === 'short'
          );
          this.remove();
        }
      }

      customElements.define('ico-nic', IconicLoader);
    }
  }

  const iconic = (global.iconic = new Iconic());

  iconic.init();

  document.addEventListener('DOMContentLoaded', ev => {
    iconic.load();
  });
})(window);

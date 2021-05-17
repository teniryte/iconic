// @ts-nocheck
(function () {
  if (window.iconic) return;

  class Iconic {
    icons = {};
    mods = {};

    async init() {
      customElements.define('ico-nic', IconicLoader);
    }

    async load() {
      await this.applyStyles();
      await this.loadIcons();
      await this.defineIconClasses();
    }

    async applyStyles() {
      let response = await fetch('/css/iconic.css'),
        css = await response.text(),
        style = document.createElement('style');
      style.innerHTML = css;
      document.head.appendChild(style);
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

    async loadPackIcons(packName) {
      let url = `/api/pack/${packName}/`,
        response = await fetch(url),
        data = await response.json(),
        icons = data.icons;
      Object.assign(this.icons, icons);
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

    defineIconClass(elementName) {
      class IconElement extends HTMLElement {
        static get observedAttributes() {
          return ['icon'];
        }

        constructor(...args) {
          super(...args);
        }

        render() {
          let iconName = this.getIconName(),
            code = iconic.getIconCode(elementName, iconName);
          this.innerHTML = code || '';
        }

        connectedCallback() {
          this.setAttribute('class', `iconic-icon ${elementName}`);
        }

        attributeChangedCallback(name, oldValue, newValue) {
          this.render();
        }

        getIconName() {
          return this.getAttribute('icon');
        }
      }

      customElements.define(elementName, IconElement);
    }
  }

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

  const iconic = new Iconic();

  iconic.init();

  document.addEventListener('DOMContentLoaded', ev => {
    iconic.load();
  });

  window.iconic = iconic;
})();

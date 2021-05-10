(function () {
  const ICONS = '{{icons}}',
    elementName = '{{elementName}}';

  addStyles();
  createElement();

  function createElement() {
    class IconicIcon extends HTMLElement {
      constructor(...args) {
        super(...args);
        this.iconName = '';
      }

      render() {
        this.innerHTML = ICONS[this.iconName];
      }

      connectedCallback() {
        this.iconName = this.getIconName();
        this.classList.add('iconic-icon');
        this.classList.add(elementName);
        this.render();
      }

      static get observedAttributes() {
        return ['name', 'icon'];
      }

      attributeChangedCallback(name, oldValue, newValue) {
        this.iconName = this.getIconName();
        this.render();
      }

      getIconName() {
        return this.getAttribute('name') || this.getAttribute('icon');
      }
    }

    customElements.define(elementName, IconicIcon);
  }

  function addStyles() {
    let styles = `
      .iconic-icon {
        display: inline-block;
        fill: inherit;
        width: 1em;
        height: 1em;
      }

      .iconic-icon svg {
        width: 100%;
        height: 100%;
        fill: inherit;
      }
    `,
      style = document.createElement('style');

    style.innerHTML = styles;
    document.head.appendChild(style);
  }
})();

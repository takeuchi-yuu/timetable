export class ClassEditPage extends HTMLElement {
  /** @type { ShadowRoot | undefined } */
  shadowRoot = undefined;

  html = () => /* html */ `
    <span>class list page</span>
  `;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = this.html();
  }
}

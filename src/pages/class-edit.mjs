export class ClassEditPage extends HTMLElement {
  /** @type { ShadowRoot | undefined } */
  shadowRoot = undefined;

  css = () => /* css */ `
    ${basicStyle}
  `;

  html = () => /* html */ `
    <div class="class-edit">
      <div class="header">
        <button class="move-list">⬅️</button>
        <span>class edit page</span>
        <button class="save">💾</button>
      </div>
      <div class="input-container">
        <span>科目名</span>
        <input type="text" id="class-name"/>
      </div>
    </div>
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

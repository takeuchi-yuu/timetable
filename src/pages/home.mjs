import { basicStyle } from "../shared/style.mjs";
export class HomePage extends HTMLElement {
  /** @type { ShadowRoot | undefined } */
  shadowRoot = undefined;

  css = () => /* css */ `
    ${basicStyle}

    :host .home {
      width: 100%;
      height: 100%;
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: 32px repeat(4, 1fr);
      place-content: center;

      & > .class-item {
        width: 100%;
        height: 100%;
        display: grid;
        place-content: center;
      }
    }
  `;

  html = () => /* html */ `
    <span>home page</span>
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

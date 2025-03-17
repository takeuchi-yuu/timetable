import { basicStyle } from "../shared/style.mjs";

export class ClassEditPage extends HTMLElement {
  /** @type { ShadowRoot | undefined } */
  shadowRoot = undefined;

  css = () => /* css */ `
    ${basicStyle}

    :host .class-edit {
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: column;
      overflow: scroll;

      & > .header {
        height: 32px;
        width: 100%;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        
        & > button {
          height: 32px;
          width: 32px;
          border: none;
          background-color: transparent;
          font-size: 24px;
          text-align: center;
        }

        & > span {
          width: 100%;
          font-size: 24px;
          font-weight: bold;
          text-align: center;
        }
      }

      & > .input-container {
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-columns: 100px 1fr;
        grid-template-rows: repeat(1, 32px);
        gap: 8px;

        & input {
          height: 32px;
          padding: 0 16px;
          border-radius: 100vh;
        }
      }
    }
  `;

  html = () => /* html */ `
    <style>${this.css()}</style>
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

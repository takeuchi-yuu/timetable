import { basicStyle } from "../shared/style.mjs";
import { DB, CLASS_STORE_NAME } from "../shared/db.mjs";

export class ClassListPage extends HTMLElement {
  /** @type { ShadowRoot | undefined } */
  shadowRoot = undefined;

  /** @type { import("../types.mjs").ClassData[] } */
  classDatas = [];

  css = () => /* css */ `
  ${basicStyle}

  :host .class-list {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;

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
        border-radius: 5px;
        cursor: pointer;
        &:hover {
          background-color:rgb(212, 212, 212);        
        }
      }

      & > span {
        width: 100%;
        font-size: 24px;
        font-weight: bold;
        text-align: center;
      }
    }

    & > .list {
      height: 100%;
      width: 100%;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      
      & > class-list-item {
        margin-bottom: 8px;
      }
    }
  }
`;

  html = () => /* html */ `
    <style>${this.css()}</style>
    <div class="class-list">
      <div class="header">
        <button class="move-home">⬅️</button>
        <span>class list page</span>
        <button class="add">➕</button>
      </div>
      <div class="list">
      ${this.classDatas
        .map(
          (classData) => /* html */ `
            <class-list-item class-data=${JSON.stringify(classData)}></class-list-item>
          `
        )
        .join("")}
      </div>
    </div>
  `;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    this.classDatas = await DB.getAll(CLASS_STORE_NAME);

    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = this.html();

    const addClassButton = this.shadowRoot.querySelector("button.add");
    const moveToHomeButton = this.shadowRoot.querySelector("button.move-home");

    addClassButton.addEventListener("click", () => {
      const url = new URL(location.href);
      url.hash = "#class-edit";
      location.href = url.href;
    });
    moveToHomeButton.addEventListener("click", () => {
      const url = new URL(location.href);
      url.hash = "#home";
      location.href = url.href;
    });
  }
}

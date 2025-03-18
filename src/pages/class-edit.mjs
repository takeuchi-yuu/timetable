import { DB, CLASS_STORE_NAME } from "../shared/db.mjs";
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

    const saveButton = this.shadowRoot.querySelector("button.save");
    saveButton.addEventListener("click", async () => {
      const className = this.shadowRoot.getElementById("class-name").value;
      const classId = crypto.randomUUID();

      /** @type {import("..\shared\types.mjs").ClassData} */
      const data = {
        id: new URLSearchParams(window.location.search).get("classId") || crypto.randomUUID(),
        name: className,
      };

      await DB.set(CLASS_STORE_NAME, data);
      this.moveToList();
    });

    const moveToListButton = this.shadowRoot.querySelector("button.move-list");
    moveToListButton.addEventListener("click", this.moveToList);
  }

  moveToList() {
    const url = new URL(location.href);
    url.hash = "#class-list";
    location.href = url.href;
  }
}

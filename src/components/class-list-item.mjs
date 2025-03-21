import { basicStyle } from "../shared/style.mjs";

export class ClassListItem extends HTMLElement {
  /** @type { ShadowRoot | undefined } */
  shadowRoot = undefined;

  static observedAttributes = ["class-data"];

  /**
   * @type { import("../types.mjs").ClassData }
   */
  get classData() {
    // console.log("class-data is " + this.getAttribute("class-data"));
    return JSON.parse(this.getAttribute("class-data"));
  }

  css = () => /* css */ `
    ${basicStyle}

    :host .class-list-item {
      height: 32px;
      width: 100%;
      padding: 0 16px;
      display: flex;
      align-items: center;
      border-radius: 5px;
      cursor: pointer;

      & span.arrow {
        margin-left: auto;
      }

      &:hover {
        background-color: rgb(234, 234, 234);
      }
    }
  `;

  html = () => /* html */ `
    <style>${this.css()}</style>
    <div class="class-list-item">
      <span>${this.classData.name}</span>
      <span class="arrow">➡️</span>
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
    this.addEventListener("click", () => {
      const url = new URL(location.href);
      url.hash = "#class-edit";
      url.search = new URLSearchParams({ classId: this.classData.id }).toString();
      location.href = url.href;
    });
  }
}

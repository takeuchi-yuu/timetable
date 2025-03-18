import { basicStyle } from "../shared/style.mjs";

export class TimeTableDetailComponent extends HTMLElement {
  /** @type { ShadowRoot | undefined } */
  shadowRoot = undefined;

  /** @type {import("../types.mjs").ClassData[]} */
  classDatas = [];

  /** @type {import("../types.mjs").TableData} */
  tableData = undefined;

  static observedAttributes = ["day-period"];
  /** @type { import("../types.mjs").ClassData } */
  get dayPeriod() {
    return this.getAttribute("day-period");
  }

  get day() {
    return this.dayPeriod.split("-")[0];
  }

  get period() {
    return this.dayPeriod.split("-")[1];
  }

  css = () => /* css */ `
    ${basicStyle}

    :host .timetable-detail {
      height: 100%;
      width: 100%;
      padding: 16px;
      border-top: 2px solid lightgray;

      > .empty {
        width: 100%;
        height: 100%;
        display: grid;
        place-content: center;
        color: gray;
      }
    }
  `;

  html = () => /* html */ `
    <style>${this.css()}</style>
    <div class="timetable-detail">
      ${(() => {
        if (!this.dayPeriod) {
          return /* html */ `
            <div class="empty">
              <span>授業を選択してください</span>
            </div>
          `;
        } else {
          return /* html */ `
            <span>${this.dayPeriod}</span>
          `;
        }
      })()}
    </div>
  `;

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = this.html();
  }
}

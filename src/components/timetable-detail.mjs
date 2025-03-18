import { CLASS_STORE_NAME, DB, TABLE_STORE_NAME } from "../shared/db.mjs";
import { basicStyle } from "../shared/style.mjs";

export class TimeTableDetailComponent extends HTMLElement {
  /** @type { ShadowRoot | undefined } */
  shadowRoot = undefined;

  /** @type {import("../types.mjs").ClassData[]} */
  classDatas = [];

  /** @type {import("../types.mjs").TableData} */
  tableData = undefined;

  isEditting = false;

  static observedAttributes = ["day-period"];
  /** @type { import("../types.mjs").ClassData } */
  get dayPeriod() {
    // return this.getAttribute("day-period");
    return "水-2";
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

  html = () => {
    const empty = () => /* html */ `
      <div class="empty">
        <span>授業を選択してください</span>
      </div>
    `;

    const classDatas = [{ id: "empty", name: "空き" }, ...this.classDatas];

    const contentFull = () => /* html */ `
      <div class="header">
        <span>${this.day}曜日 ${this.period}限目</span>
        <button class="header-button">${this.isEditting ? "💾" : "✏️"}</button>
      </div>
      <div>${
        this.isEditting
          ? /* html */ `
              <select id="class-select">
                ${classDatas.map(
                  (classData) => /* html */ `
                    <option value="${classData.id}
                            ${classData.id === this.classData?.id ? "selected" : ""}">
                  `
                )}
              </select>
            `
          : !this.tableData
          ? /* html */ `
              <span>空きコマ</span>
            `
          : /* html */ `
              <span>${this.classData.name}</span>
            `
      }
      </div>
    `;

    return /* html */ `
      <style>${this.css()}</style>
      ${!this.dayPeriod ? empty() : contentFull()}
    `;
  };

  constructor() {
    super();
    this.shadowRoot = this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    if (this.dayPeriod) {
      this.tableData = await DB.get(TABLE_STORE_NAME);
    }
    this.classDatas = await DB.getAll(CLASS_STORE_NAME);

    this.render();
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    if (name === "dayperiod") {
      this.isEditting = false;
      this.tableData = /** @type { import("../types.mjs").TableData } */ (
        await DB.get(TABLE_STORE_NAME, newValue)
      );
      this.render();
    }
  }

  render() {
    this.shadowRoot.innerHTML = this.html();
    if (this.dayPeriod) {
      this.shadowRoot
        .querySelector("button.header-button")
        .addEventListener("click", this.onClickHeaderButton);
    }
  }

  onClickHeaderButton = async () => {
    if (this.isEditing) {
      const id = /** @type {HTMLSelectElement} */ (
        this.shadowRoot.querySelector("select#class-select")
      ).value;
      if (id === "empty") {
        this.tableData = undefined;
        await DB.delete(TABLE_STORE_NAME, this.dayPeriod);
      } else {
        this.tableData = { dayperiod: this.dayPeriod, classId: id };
        await DB.set(
          TABLE_STORE_NAME,
          /** @type {import("../types.mjs").TableData} */ (this.tableData)
        );
      }
      // 親になるHomePageで時間割表の内容が書き換えられたことを検知するため
      this.dispatchEvent(
        new CustomEvent("tableItemChange", { bubbles: true, composed: true, detail: null })
      );
    }
    this.isEditing = !this.isEditing;
    this.render();
  };
}

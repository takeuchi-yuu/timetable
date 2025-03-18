import { basicStyle } from "../shared/style.mjs";

export class TimeTableComponent extends HTMLElement {
  /** @type {ShadowRoot | undefined} */
  shadowRoot = undefined;
  css = () => /* css */ `
    ${basicStyle}

    :host .timetable {
      width: 100%;
      height: 100%;
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: 32px repeat(4, 1fr);
      place-content: center;

      & > div {
        width: 100%;
        height: 100%;
        display: grid;
        place-content: center;
      }
    }
  `;

  html = () => /* html */ `
    <style>${this.css()}</style>
    <div class="timetable">
      ${(() => {
        const days = ["月", "火", "水", "木", "金"];
        const periods = [0, 1, 2, 3, 4];
        const elements = [];

        for (const day of days) {
          elements.push([]);
          for (const period of periods) {
            if (period === 0) {
              // 列番号
              elements.slice(-1)[0].push(/* html */ `
                <div class="table-header">
                  <span>${day}</span>
                </div>
                `);
            } else {
              // 教科
              elements.slice(-1)[0].push(/* html */ `
                <div class="class-item">
                  <span>${day}${period}</span>
                </div>
                `);
            }
          }
        }

        return elements
          .map((elm) => {
            elm.join("");
          })
          .join("");
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
    this.innerHTML = this.html();
  }
}

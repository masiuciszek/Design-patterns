import { Course } from "../../mvc/models/course-model"
import { Teacher } from "../models/teacher"

export class ListView<T> {
  parentElement: HTMLDivElement
  dataList: Array<T>
  title: string
  subTitles: string[]
  constructor(
    parentElement: HTMLDivElement,
    dataList: Array<any>,
    title: string,
    subTitles: string[],
  ) {
    this.parentElement = parentElement
    this.dataList = dataList
    this.title = title
    this.subTitles = subTitles
  }

  clickHandler(subscriber: Function) {
    const trs = document.querySelectorAll("tr")
    trs.forEach(tr =>
      tr.addEventListener("click", () => {
        subscriber(parseInt(tr.dataset.id!, 10))
        sessionStorage.setItem("user", String(tr.dataset.id))
      }),
    )
  }

  private render(): void {
    const html = `
    <div class="table-wrapper wrapper-${this.title}">
    <table>
        <caption>${this.title}</caption>
        <thead>
          ${this.subTitles.map(t => `<th>${t}</th>`).join("")}
        </thead>
        <tbody>
          ${(this.dataList as Array<any>)
            .map((data: any) => {
              const displayInfo = data.displayInfo() as { [key: string]: string }
              return `
                <tr data-id="${data.id}">
                ${Object.keys(displayInfo)
                  .map(key => `<td>${displayInfo[key]}</td>`)
                  .join("")}
                </tr>
          `
            })
            .join("")}
        </tbody>
      </table>
    </div>
    `
    // this.parentElement.insertAdjacentHTML("beforebegin", html)
    this.parentElement.innerHTML = html
  }

  init(): void {
    this.render()
  }
}
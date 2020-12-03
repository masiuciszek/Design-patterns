import { ListView } from "../views/list-view"
import { Course, loadCourses, registerCourses } from "../models/course"

export class CourseController {
  parentElement: HTMLDivElement
  coursesView: ListView<Course>
  constructor(parentElement: HTMLDivElement) {
    this.parentElement = parentElement
    this.coursesView = new ListView(this.parentElement, loadCourses(), "Courses", [
      "title",
      "duration",
    ])
  }

  init(): void {
    this.coursesView.init()
    registerCourses()
  }
}

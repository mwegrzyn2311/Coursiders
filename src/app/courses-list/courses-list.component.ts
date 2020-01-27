import {Component, OnInit} from '@angular/core';
import {Course} from '../models/course';
import { NgModule } from '@angular/core';
import {CourseComponent} from '../course/course.component';
import {AppRoutingModule} from '../app-routing.module';
import {AppComponent} from '../app.component';
import {BrowserModule} from '@angular/platform-browser';
import {CourseService} from '../services/course.service';
import {CourseFilterPipe} from '../pipes/course-filter.pipe';
import {FilterParams} from '../models/filter-params';
import {SearchService} from '../services/search.service';

@NgModule({
  declarations: [
    CourseComponent,
    CourseFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css'],
  providers: []
})
export class CoursesListComponent implements OnInit {
  courses: Array<Course>;
  filterParams: FilterParams;
  constructor(private courseService: CourseService, private searchService: SearchService) {
  }
  getCourses(): void {
    this.courseService.getCourses()
        .subscribe(courses => this.courses = courses);
  }
  getFilterParams() {
    this.searchService.getParams()
        .subscribe(params => this.filterParams = params);
  }
  removeCourse(course: Course): void {
    this.courseService.removeCourse(course);
  }
  updateCourse(course: Course): void {
    this.courseService.updateCourse(course);
  }
  ngOnInit() {
    this.getCourses();
    this.getFilterParams();
  }

}

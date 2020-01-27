import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Course} from '../models/course';

@Component({
  selector: '[app-course]',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  @Input() course: Course;
  @Output() removeCourse = new EventEmitter<Course>();
  @Output() updateCourse = new EventEmitter<Course>();
  rated: boolean;
  constructor() {
    this.rated = false;
  }
  public remove(): void {
    this.removeCourse.emit(this.course);
  }
  public rate(rating: number): void {
    this.removeCourse.emit(this.course);
    this.course.currentScore = (this.course.currentScore * this.course.ratingCount + rating) / (this.course.ratingCount + 1);
    this.course.ratingCount++;
    this.rated = true;
    this.updateCourse.emit(this.course);
  }
  ngOnInit() {
  }
}

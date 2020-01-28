import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CourseService} from '../services/course.service';
import {Course} from '../models/course';
import {ActivatedRoute, Router} from '@angular/router';
import {of, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-edit-course-form',
  templateUrl: './edit-course-form.component.html',
  styleUrls: ['./edit-course-form.component.css']
})
export class EditCourseFormComponent implements OnInit {

  courseForm: FormGroup;
  course: Course;

  constructor(private formBuilder: FormBuilder, private courseService: CourseService, private actRoute: ActivatedRoute) {
  }

  getCourseAndCreateForm() {
    this.actRoute.params.forEach((params) => {
      if (params && params.name) {
        this.courseService.getCourse(params.name).subscribe(course => {
          this.course = course;
          this.courseForm = this.formBuilder.group({
            icon: [this.course.icon, [Validators.required]],
            name: [this.course.name, [Validators.required, Validators.maxLength(50)]],
            format: [this.course.format, [Validators.required, Validators.maxLength(20)]],
            term: [this.course.term, [Validators.required, Validators.min(1), Validators.max(10)]],
            capacity: [this.course.capacity, [Validators.required, Validators.min(12), Validators.max(400)]],
            ects: [this.course.ects, [Validators.required, Validators.min(0), Validators.max(15)]],
            exam: [this.course.exam, [Validators.required]],
          });
        });
      }
    });
  }

  ngOnInit(): void {
    this.getCourseAndCreateForm();
  }

  onSubmit() {
    alert(this.course.name);
    if (!this.courseForm.valid) {
      alert('Fill form in with proper values');
      return;
    }
    const course = new Course();
    course.name = this.courseForm.value.name;
    course.icon = this.courseForm.value.icon;
    course.format = this.courseForm.value.format;
    course.term = this.courseForm.value.term as number;
    course.capacity = this.courseForm.value.capacity as number;
    course.ects = this.courseForm.value.ects as number;
    course.points = 0;
    course.spotsTaken = 0;
    course.ratingCount = 0;

    course.exam = (this.courseForm.value.exam === 'true');

    this.courseService.updateCourse(course);
  }
}

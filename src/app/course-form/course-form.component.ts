import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Course } from '../models/course';
import {CourseService} from '../services/course.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  courseForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private courseService: CourseService) {
  }
  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      icon: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      format: ['', [Validators.required, Validators.maxLength(20)]],
      term: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      capacity: ['', [Validators.required, Validators.min(12), Validators.max(400)]],
      ects: ['', [Validators.required, Validators.min(0), Validators.max(15)]],
      exam: ['', [Validators.required]],
    });


  }

  onSubmit() {
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

    this.courseService.addCourse(course);
  }
}

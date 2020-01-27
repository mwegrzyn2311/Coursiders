import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Course } from '../models/course';
import {CourseService} from '../services/course.service';
import {of} from 'rxjs';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  modelForm: FormGroup;

  formErrors = {
    icon: '',
    name: '',
    exam: '',
    format: '',
    capacity: ''
  };

  private validationMessages = {
    icon: {
      required: 'Course icon is required'
    },
    name: {
      required: 'Course name is required',
      maxlength: 'Course name cannot be longer than 30 characters'
    },
    format: {
      required: 'Course format is required'
    },
    term: {
      required: 'Term of the course is required',
      min: 'Term cannot be lower than 1',
      max: 'Term cannot be higher than 10'
    },
    capacity: {
      required: 'Course capacity is required',
      min: 'Course capacity cannot be lower than 22',
      max: 'Course capacity cannot exceed 400'
    },
    exam: {
      required: 'Info about exam is required'
    }
  };

  constructor(private formBuilder: FormBuilder, private courseService: CourseService) {
  }
  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      icon: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.maxLength(30)]],
      format: ['', [Validators.required, Validators.maxLength(10)]],
      term: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      capacity: [150, [Validators.required, Validators.min(22), Validators.max(400)]],
      exam: ['', [Validators.required]],
    });

  }
  onSubmit() {
    const course = new Course();
    course.name = this.modelForm.value.name;
    course.icon = this.modelForm.value.icon;
    course.format = this.modelForm.value.format;
    course.term = this.modelForm.value.term as number;
    course.capacity = this.modelForm.value.capacity as number;
    course.ects = 4;
    course.currentScore = 0;
    course.ratingCount = 0;

    course.exam = (this.modelForm.value.exam === 'true');

    this.courseService.addCourse(course);
  }
}

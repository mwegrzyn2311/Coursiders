import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from '../models/course';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private db: AngularFireDatabase) {
  }

  getCourses(): Observable<any> {
    return this.db.list('/Courses').valueChanges();
  }
  getCourse(name: string): Observable<any> {
    return this.db.object('/Courses/' + name).valueChanges();
  }
  addCourse(course: Course) {
    this.db.list('/Courses').set(String(course.name), course);
  }
  removeCourse(course: Course): Promise<void> {
    return this.db.list('/Courses').remove(course.name);
  }
  updateCourse(course: Course) {
    this.db.object('Courses/' + course.name).update(course);
  }
}

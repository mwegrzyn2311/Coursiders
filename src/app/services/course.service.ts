import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from '../models/course';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  user: User;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
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
  updateCourse(course: Course) {
    this.addCourse(course);
  }
  removeCourse(course: Course) {
    this.db.list('/Courses').remove(course.name);
    this.authService.deleteCourseFromUsers(course);
  }

}

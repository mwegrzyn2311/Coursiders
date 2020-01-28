import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Course} from '../models/course';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../services/course.service';
import {AuthService} from '../services/auth.service';
import {switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {User} from '../models/user';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {
  course: Course;
  user: User;

  constructor(private actRoute: ActivatedRoute, private courseService: CourseService, private authService: AuthService, private router: Router) {
  }

  courseRated(): boolean {
    return(this.user != null && this.course != null && this.user.ratedCourses && this.user.ratedCourses.includes(this.course.name));
  }

  courseJoined(): boolean {
    return(this.user != null && this.course != null && this.user.joinedCourses && this.user.joinedCourses.includes(this.course.name));
  }

  startEditingCourse() {
    alert('Implement course editing!');
  }

  deleteCourse() {
    this.courseService.removeCourse(this.course);
    this.router.navigate(['/']);
  }

  joinCourse() {
    if (this.user.joinedCourses == null) {
      this.user.joinedCourses = [];
    }
    this.user.joinedCourses.push(this.course.name);
    this.authService.updateUser(this.user);
  }

  rate(score: number) {
    this.course.points += score;
    this.course.ratingCount ++;
    if (this.user.ratedCourses == null) {
      this.user.ratedCourses = [];
    }
    this.user.ratedCourses.push(this.course.name);
    this.courseService.updateCourse(this.course);
    this.authService.updateUser(this.user);
  }

  getCourse() {
    this.actRoute.params.pipe(switchMap((params) => {
      if (params && params.name) {
        return this.courseService.getCourse(params.name);
      } else {
        return of(null);
      }
    })).subscribe((course) => {
      if (course != null) {
        this.course = course;
      }
    });
  }

  getUser() {
    this.authService.currentUser().subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.getCourse();
    this.getUser();
  }

}

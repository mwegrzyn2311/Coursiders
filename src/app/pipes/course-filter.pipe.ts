import { Pipe, PipeTransform } from '@angular/core';
import {Course} from '../models/course';
import {FilterParams} from '../models/filter-params';

@Pipe({
  name: 'courseFilterPipe',
  pure: false,
})
export class CourseFilterPipe implements PipeTransform {

  transform(courses: Course[], params: FilterParams): Course[] {

    if (!courses) {
      return [];
    }
    if (!params) {
      return courses;
    }

    let names = true;
    if (params.name)
      names = false;

    let terms = true;
    if (params.term)
      terms = false;

    let ectss = true;
    if (params.ects)
      ectss = false;

    let scores = true;
    if (params.score)
      scores = false;

    return courses.filter(course => {
      if (!names && !course.name.toLowerCase().includes(params.name.toLowerCase())) {
        return false;
      }
      switch (params.termType) {
        case(-1):
          if (!terms && course.term >= params.term) return false;
          break;
        case(0):
          if (!terms && course.term != params.term) return false;
          break;
        case(1):
          if (!terms && course.term <= params.term) return false;
          break;
      }
      switch (params.ectsType) {
        case(-1):
          if (!ectss && course.ects >= params.ects) return false;
          break;
        case(0):
          if (!ectss && course.ects != params.ects) return false;
          break;
        case(1):
          if (!ectss && course.ects <= params.ects) return false;
          break;
      }
      switch (params.scoreType) {
        case(-1):
          if (!scores && (course.points / course.ratingCount) >= params.score) return false;
          break;
        case(0):
          if (!scores && (course.points / course.ratingCount) != params.score) return false;
          break;
        case(1):
          if (!scores && (course.points / course.ratingCount) <= params.score) return false;
          break;
      }
      return true;
    });
  }
}

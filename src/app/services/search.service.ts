import { Injectable } from '@angular/core';
import {FilterParams} from '../models/filter-params';
import {Observable, of, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  subject: Subject<FilterParams>;

  constructor() {
    this.subject = new Subject<FilterParams>();
  }
  setParams(newParams: FilterParams) {
    this.subject.next(newParams);
  }
  getParams(): Observable<FilterParams> {
    return this.subject.asObservable();
  }
}

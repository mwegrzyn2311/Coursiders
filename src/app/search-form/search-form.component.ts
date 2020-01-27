import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, } from '@angular/forms';
import { FilterParams } from '../models/filter-params';
import { SearchService } from '../services/search.service';
import { EquationSign } from '../models/equation-sign';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css'],
  providers: []
})

export class SearchFormComponent implements OnInit {

  modelForm: FormGroup;
  eqSigns: Array<EquationSign>;

  constructor(private formBuilder: FormBuilder, private searchService: SearchService) {
    this.eqSigns = new Array<EquationSign>();
    this.eqSigns.push(new EquationSign(-1, '<'));
    this.eqSigns.push(new EquationSign(0, '='));
    this.eqSigns.push(new EquationSign(1, '>'));
  }
  ngOnInit(): void {
    this.modelForm = this.formBuilder.group({
      name: ['', []],
      termType: [-1, []],
      term: ['', []],
      ectsType: [-1, []],
      ects: ['', []],
      scoreType: [-1, []],
      score: ['', []]
    });
  }
  onSubmit(): void {
    const params = new FilterParams();
    params.name = this.modelForm.value.name;
    params.termType = this.modelForm.value.termType;
    params.term = this.modelForm.value.term;
    params.ectsType = this.modelForm.value.ectsType;
    params.ects = this.modelForm.value.ects;
    params.scoreType = this.modelForm.value.scoreType;
    params.score = this.modelForm.value.score;
    this.searchService.setParams(params);
  }
}

import {Component, NgModule, OnInit} from '@angular/core';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  declarations: [],
  imports: [
    AppRoutingModule
  ],
  providers: [],
  bootstrap: []
})
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  public isCollapsed = true;
  constructor() { }

  ngOnInit() {
  }
}

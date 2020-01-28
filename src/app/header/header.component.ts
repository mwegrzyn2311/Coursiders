import {Component, NgModule, OnInit} from '@angular/core';
import {AppRoutingModule} from '../app-routing.module';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {User} from '../models/user';
import {logging} from 'selenium-webdriver';
import getLogger = logging.getLogger;


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
  loggedIn: boolean;
  user: User;

  constructor(private fireAuth: AngularFireAuth, private authService: AuthService) {
  }

  signOut() {
    return this.authService.signOut();
  }

  getLoggedState() {
    this.authService.currentUser().subscribe((user) => {
      if (user == null) {
        this.loggedIn = false;
      } else {
        this.user = user;
        this.loggedIn = true;
      }

    });
  }

  ngOnInit() {
    this.getLoggedState();
  }
}

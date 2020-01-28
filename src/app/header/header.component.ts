import {Component, HostListener, NgModule, OnInit} from '@angular/core';
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
  screenWidth: number;

  constructor(private fireAuth: AngularFireAuth, private authService: AuthService) {
  }

  signOut() {
    this.isCollapsed = false;
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

  getLongName(): string {
    if (this.user.username.length <= 40) {
      return this.user.username;
    } else {
      return this.user.username.slice(0, 40) + '...';
    }
  }
  getShortName(): string {
    if (this.user.username.length <= 12) {
      return this.user.username;
    } else {
      return this.user.username.slice(0, 10) + '...';
    }
  }

  fitsIn(): boolean {
    return this.screenWidth >= 700;
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenWidth = window.innerWidth;
  }

  ngOnInit() {
    this.getLoggedState();
    this.getScreenSize();
  }
}

import { Injectable } from '@angular/core';
import {AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Observable, of, Subject} from 'rxjs';
import {User} from '../models/user';
import {AngularFireDatabase} from '@angular/fire/database';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<User>;

  constructor(public fireAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {
    this.user = this.fireAuth.authState.pipe(switchMap(user => {
      if (user) {
         return this.db.object<User>('/Users/' + user.uid).valueChanges();
      } else {
        return of(null);
      }
    }));
  }

  currentUser(): Observable<User> {
    return this.user;
  }

  updateUser(user: User) {
    this.db.object('/Users/' + user.uid).update(user);
  }

  signUp(email: string, password: string, username: string) {
    this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
      console.log(result.user);
      const user = new User();
      user.uid = result.user.uid;
      user.username = username;
      user.email = result.user.email;
      user.role = 'common';
      user.joinedCourses = [];
      user.ratedCourses = [];
      this.db.list('/Users').set(String(result.user.uid), user);
      this.router.navigate(['/']);
    }).catch((error) => {
      alert(error.message);
    });
  }

  signIn(email: string, password: string, stayLogged: boolean) {

    return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
        .then((result) => {
          this.router.navigate(['/']);
        }).catch((error) => {
          alert(error.message);
        });

    /* Code below doesn't work for now. Sth wrong with auth persistence
    let session = this.fireAuth.auth.Persistence.SESSION;
    if (stayLogged) {
      session = this.fireAuth.auth.Persistence.LOCAL;
    }
    return this.fireAuth.auth.setPersistence(session)
        .then(() => {
          return this.fireAuth.auth.signInWithEmailAndPassword(email, password)
              .then((result) => {
                // this.router.navigate(['/']);
                alert('You have successfully logged in');
              }).catch((error) => {
                alert(error.message);
              });
        });

     */
  }

  signOut() {
    this.fireAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}

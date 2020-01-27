import { Injectable } from '@angular/core';
import {AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public fireAuth: AngularFireAuth) { }

  signUp(email: string, password: string) {
    this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
      window.alert('You have been successfully registered!');
      console.log(result.user);
    }).catch((error) => {
      alert(error.message);
    });
  }

  signIn(email: string, password: string, stayLogged: boolean) {
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

  }
}

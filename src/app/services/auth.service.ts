import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private user: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return user.uid;
        } else {
          return of(null)
        }
      })
    )
  }

  login(email: string, password: string) {
    return this.oAuthLogin(email, password);
  }
  //https://angularfirebase.com/lessons/google-user-auth-with-firestore-custom-data/
  private oAuthLogin(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(credentials => {
        this.router.navigate(['/admin']);
      })
      .catch(err => {
        alert(err);
      });
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  getUser(): Observable<User> {
    return this.user;
  }
}
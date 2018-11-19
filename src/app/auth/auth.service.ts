import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from 'rxjs/Rx';

import { User } from './user.interface';
import { AlertService } from './../shared/alert/alert.service';

@Injectable()
export class AuthService {

  //private _showNavBar = new BehaviorSubject<boolean>(null);
  public showNavBarEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();
  // public loading: boolean = false;

  constructor(private router: Router, private alertService: AlertService) {}

  signIn(user: User, byAuth: boolean = false) {
    // this.loading = true;
    if (user.email === 'fpetrobernardes@gmail.com' && user.password === '1'){
      this.showNavBar(true);
      if (!byAuth) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['/']);
      }
    } else {
      const errors = [{
          text: "Wrong credentials, try again.",
          type: "error"
        },{
          text: "Fixed: User: fpetrobernardes@gmail.com, pass: 1.",
          type: "info",
          keepAfterNavigationChange: true
      }];
      this.alertService.messages(errors);
      // this.loading = false;
      localStorage.removeItem('currentUser');
    }
  }

  logout() {
    this.showNavBar(false);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/signin']);
  }

  isAuthenticated() {
    if (localStorage.getItem('currentUser')) {
      let obj: any = JSON.parse(localStorage.getItem('currentUser'));
      // logged in so return true
      const user: User = {
        email: obj.email,
        password: obj.password,
      };
      this.signIn(user, true);
      return true;
    } else {
      return false;
    }
  }

  private showNavBar(ifShow: boolean) {
     this.showNavBarEmitter.emit(ifShow);
  }
}

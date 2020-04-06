import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(public router: Router) { }

  canActivate(): boolean {
    if (this.userLoggedIn()) {
      if (this.userAdmin()) {
        // this.router.navigate([`dashboard`]);
        return true;
      }
      const userInfo: any = JSON.parse(localStorage.getItem('userInfo'));
      this.router.navigate([`profile/${userInfo.id}`]);
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }

  public userLoggedIn(): boolean {
    if (localStorage.getItem('userInfo')) {
      return true;
    }
    return false;
  }

  public userAdmin(): boolean {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return userInfo['is_admin'];
  }

}

//we have used ng g g for guard command to make AuthGuard
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from "../shared/user.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
//with the help of AuthGurad class we have defined how to check wether a user is logged in or not
//this class is also added into the app.ts file
//using this class we can protect private routes
//we also used this class in routes
export class AuthGuard implements CanActivate {
  // added this constructor 
  constructor(private userService : UserService,private router : Router){}
  //inside this function we have to give criteria wether a user is logged in or not 
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      //this caluse is added to handle non-authenticated user
      if (!this.userService.isLoggedIn()) {
        //if the user is not logged in we will redirect to login page
        this.router.navigateByUrl('/login');
        //delete the token from local storage
        this.userService.deleteToken();
        return false;
      }
    return true;
  }
}

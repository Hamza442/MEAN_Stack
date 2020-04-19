import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";

import { UserService } from "../shared/user.service";

@Injectable()
//HttpInterceptor is used to add token in the request header
//also added in app.module.ts
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userService : UserService,private router : Router){}
    //all the request from this app will go through this intercept function 
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        //for those request which donot need jwt token in their request we need to this set noauth propert from them
        //in these request we will not add jwt token 
        //those request which donot need jwt token in their header we will pass noauth property in their them
        if (req.headers.get('noauth'))
            //here we are allowing them
            return next.handle(req.clone());
        else {  
            //clone means that we are making copy of the request
            const clonedreq = req.clone({
                //req.headers is the actuall header
                //there is space after bearer
                headers: req.headers.set("Authorization", "Bearer " + this.userService.getToken())
            });
            //in the handle function we are passing the new request
            //for handling arrays we will use pipe
            return next.handle(clonedreq).pipe(
                //tap from rxjs
                tap(
                    //if every thing is fine this function is called
                    event => { },
                    //if not then this 
                    err => {
                        //jwt token is manipulated then this request will fail 
                        //and navigate it to login page
                        //if auth property in error is false then we can say that there is manipulation init
                        if (err.error.auth == false) {
                            console.log(err.error.auth);
                            this.router.navigateByUrl('/login');
                        }
                    })
            );
        }
    }
}
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };

  //this has no auth property
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HttpMethods
  //doesnot need jwt inrequest header thats why we have added noAuthHeader
  //whne the request goes to auth.interceptors or HettpIntercepters it will check the condtion there
  //if to add header or not 
  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  }
  //this function is calling the authentcation method in node api
  login(authCredentials) {
    var data = JSON.stringify(authCredentials);
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }


  //Helper Methods
  //saved token with this method
  setToken(token: string) {
    console.log(token);
    localStorage.setItem('token', token);
  }
  //get the function from local stoarge
  getToken() {
    return localStorage.getItem('token');
  }
  //this function will remove the token from he local storage
  deleteToken() {
    localStorage.removeItem('token');
  }
  //we are getting user information from the payload using this method
  // as our token has payload so we can get it from the token
  getUserPayload() {
    //we are getting the token and storing it in variable token
    var token = this.getToken();
    if (token) {
      //we have token the we will decode it 
      //atob is a function which is used to encode or decode data
      //this function will give as an array after spliting after the . (as we know token body is divided into 3 part seprarted by dots and after first dot comes the payload)
      //[1] at this index we will get the array of our payload
      var userPayload = atob(token.split('.')[1]);
      //now we are returning it after converting into json object
      return JSON.parse(userPayload);
    }
    else
      //if no token then return null
      return null;
  }

  //from this function we verify that wether a user is logged in or not
  isLoggedIn() {
    //if we have no token then userPayload will have null value
    //but if has token then getUserPayload() will return us a json object 
    var userPayload = this.getUserPayload();
    console.log(userPayload);
    if (userPayload)
      //if it has token then we will check that user expiration time is over or not 
      //inside payload we have 3 information 
      //it will have _id,token issue time,expiration time
      //with this expresion we are checking that expiration time is over or not
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}

import { Injectable } from '@angular/core';
//also import http client module in app module file
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//import 'rxjs/add/operator/map';


import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  //with this property will design form for update and delete
  selectedEmployee: Employee;
  //insdie this we will save all employees from mongodb collection
  employees: Employee[];
  readonly baseURL = "http://localhost:3000/employees";
  constructor(private http: HttpClient) { }

  postEmployee(emp: Employee) {
    return this.http.post(this.baseURL, emp);
  }
  //to fetch employees
  getEmployeeList() {
    return this.http.get(this.baseURL);
  }
  putEmployee(emp: Employee) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }
  deleteEmployee(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}

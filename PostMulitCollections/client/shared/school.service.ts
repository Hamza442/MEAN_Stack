import { Injectable } from '@angular/core';
//to use http request
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//student model class
import{Student} from './student.model';
//course model class
import {Course} from './course.model';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  selectedStudent:Student;
  selectedCourse:Course;
//to get collection from mongodb
  students:Student[];
  courses:Course[];

  readonly baseUrl="http://localhost:3000/schools";
  constructor(private http:HttpClient) { }

  postStudent(Req){
    return this.http.post(this.baseUrl,Req);
  }
  postCourse(Forms){
    const ab =JSON.stringify(Forms);
    console.log(ab);
    return this.http.post(this.baseUrl,Forms);
  }
  getStudent(){
    return this.http.get(this.baseUrl);
  }
}

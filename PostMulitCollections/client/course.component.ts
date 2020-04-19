import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {SchoolService} from '../shared/school.service';
import{Course} from '../shared/course.model';
import{Student} from '../shared/student.model';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  providers:[SchoolService]
})
export class CourseComponent implements OnInit {

  constructor(private schoolService:SchoolService) { }

  ngOnInit() {
    this.getStudent();
  }
  resetForm(form?:NgForm){
    if(form){
      form.reset();
      this.schoolService.selectedCourse={
        _id:"",
        courseName:"",
        student:null      
      }
    }
  }
  onSubmit(course,student){
    
    const ReqArray = [course,student];
     //const value = JSON.stringify(form.value);
    this.schoolService.postCourse(ReqArray).subscribe((res)=>{
      console.log('posted');
    });
  }
  getStudent(){
    this.schoolService.getStudent().subscribe((res)=>{

      this.schoolService.students = res as Student[];
    });
  }
  
}

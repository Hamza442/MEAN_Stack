import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import {SchoolService} from '../shared/school.service';
import{Student} from '../shared/student.model';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers:[SchoolService]
})
export class StudentComponent implements OnInit {
  
  constructor(private schoolService:SchoolService) { }

  ngOnInit() {
    this.resetForm();
  
  }

  resetForm(form?:NgForm){
    if(form){
      form.reset();
      this.schoolService.selectedStudent={
        _id:"",
        firstname:"",
        lastname:"",
        fathername:"",
        course:null
      }
    }
  }

  
   
}

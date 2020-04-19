 import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//this is imported to use selectedEmployee property 
import { EmployeeService } from '../shared/employee.service';

//imported to cast res as Employees
import { Employee } from '../shared/employee.model';


declare var M: any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  //for the inection we have to add it in the providers 
  providers: [EmployeeService]
  
})
export class EmployeeComponent implements OnInit {

  //provider constructor paramter for employee service
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }
  //this function is to reset form
  //sometime the value of form can be null so thats why we make it nullable
  resetForm(form?: NgForm) {
    //this means that if we have value of form then we can call this reset fucntion
    if (form) {
      form.reset();
      this.employeeService.selectedEmployee = {
        _id: "",
        name: "",
        position: "",
        office: "",
        salary: null
      }
    }

  }
  onSubmit(form: NgForm) {
    
    //here we will consume post request from node API
    //to consume this API we make a function in employee service class
    if (form.value._id == "") {
      this.employeeService.postEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Saved Successfully', classes: 'rounded' });
      });
    }
    else {
      this.employeeService.putEmployee(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html: 'Updated Successfully', classes: 'rounded' });
      });
    }

  }
  //to get the employees
  refreshEmployeeList() {
    //function from employee service class
    this.employeeService.getEmployeeList().subscribe((res) => {
      //in this call back function we will have array of employees
      //we can assign that array to employees array
      this.employeeService.employees = res as Employee[];
    });
  }
  //for the updation
  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = emp;
  }
  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({ html: 'Deleted Successfully', classes: 'rounded' });
      });
    }
  }

}

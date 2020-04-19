import { NgModule } from '@angular/core';
import{RouterModule,Routes} from '@angular/router';

import{CreateEmployeeComponent} from './employee/create-employee.component';
import{ListEmployeesComponent} from './employee/list-employees.component'

const appRoutes:Routes=[
  //our routing paths 
  {path:'list',component:ListEmployeesComponent},
  {path:'create',component:CreateEmployeeComponent},
  //if no path is giving by the user display this 
  {path:'',redirectTo:'/list',pathMatch:'full'}
];
//in routing module we dont declare our components so we dont need the delclaretion array 


@NgModule({
  //including RouterModule to tell angular router about these components
  //components router are present in appRoutes
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  //we are exporting this to remove the router-outlet issue 
  exports:[RouterModule]
})
export class AppRoutingModule { }

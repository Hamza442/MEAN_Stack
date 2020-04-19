import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{CourseComponent} from './courses/course.component';
import{StudentComponent} from './students/student.component'


const routes: Routes = [
  {path:'students',component:StudentComponent},
  {path:'courses',component:CourseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

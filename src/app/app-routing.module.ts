import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CourseFormComponent} from './course-form/course-form.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {CourseDetailsComponent} from './course-details/course-details.component';

const routes: Routes = [
  { path: 'course-form', component: CourseFormComponent},
  { path: 'login', component: LoginComponent},
  { path: 'sign-up', component: SignUpComponent},
  { path: 'course-det/:name', component: CourseDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

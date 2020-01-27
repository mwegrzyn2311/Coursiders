import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CourseFormComponent} from './course-form/course-form.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';

const routes: Routes = [
  { path: 'courseForm', component: CourseFormComponent},
  { path: 'login', component: LoginComponent},
  { path: 'sign-up', component: SignUpComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

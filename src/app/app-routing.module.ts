import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CourseFormComponent} from './course-form/course-form.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {CourseDetailsComponent} from './course-details/course-details.component';
import {AuthGuard} from './guard/auth.guard';
import {AdminGuard} from './guard/admin.guard';
import {LoggedOutGuard} from './guard/logged-out.guard';
import {EditCourseFormComponent} from './edit-course-form/edit-course-form.component';
import {Course} from './models/course';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: ''},
  { path: 'course-form', component: CourseFormComponent, canActivate: [AdminGuard]},
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard]},
  { path: 'sign-up', component: SignUpComponent, canActivate: [LoggedOutGuard]},
  { path: 'course-det/:name', component: CourseDetailsComponent, canActivate: [AuthGuard]},
  { path: 'edit-course-form/:name', component: EditCourseFormComponent, canActivate: [AdminGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseComponent } from './course/course.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CourseFormComponent } from './course-form/course-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchFormComponent } from './search-form/search-form.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CourseFilterPipe } from './pipes/course-filter.pipe';
import { SearchService } from './services/search.service';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { EditCourseFormComponent } from './edit-course-form/edit-course-form.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesListComponent,
    CourseComponent,
    HeaderComponent,
    CourseFormComponent,
    SearchFormComponent,
    CourseFilterPipe,
    LoginComponent,
    SignUpComponent,
    CourseDetailsComponent,
    EditCourseFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    NgbCollapseModule,
    MDBBootstrapModule.forRoot(),

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule, // do obsługi autentykacji
    AngularFirestoreModule, // do obslugi baz danych
    AngularFireDatabaseModule, BrowserAnimationsModule, // do obslugi baz danych
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }


import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
      username: ['', [Validators.required]],
      repPassword: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.value.password !== this.registerForm.value.repPassword) {
      alert('Passwords don\'t match');
    } else {
      this.authService.signUp(this.registerForm.value.login, this.registerForm.value.password, this.registerForm.value.username);
    }
  }
}

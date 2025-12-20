import { Component, inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { DatePipe, UpperCasePipe, LowerCasePipe } from '@angular/common';

import { AuthenticationService } from './authentication-service';

import { IRegister } from './interfaces';

import { Router, RouterLink } from '@angular/router';

@Component({

selector: 'app-authentication',

standalone: true,

imports: [ReactiveFormsModule, DatePipe, UpperCasePipe, LowerCasePipe, RouterLink],

templateUrl: './authentication.html',

styleUrl: './authentication.scss',

})

export class Authentication implements OnInit {

registerForm!: FormGroup;

today = new Date();

private formBuilder = inject(FormBuilder);

private authenticationService = inject(AuthenticationService);

private router = inject(Router);

ngOnInit(): void {

this.registerForm = this.formBuilder.group({

  firstName: ['John'],

  lastName: ['Doe'],

  age: [21],

  email: ['john.doe@example.com'],

  password: ['Password123'],

  address: ['123 Main St'],

  phone: ['+995598123456'],

  zipcode: ['0100']

});

}

register() {

let formValue = this.registerForm.value;



let payload: IRegister = {
  firstName: formValue.firstName,

  lastName: formValue.lastName,

  age: formValue.age,

  email: formValue.email,

  password: formValue.password,

  address: formValue.address,

  phone: formValue.phone,

  zipcode: formValue.zipcode,
  gender: ''
};



console.log('Payload being sent:', payload);



this.authenticationService.signUp(payload).subscribe({

  next: (res) => {

    console.log('Signup success:', res);

    this.router.navigate(['/login']);

  },

  error: (err) => {

    console.error('Status:', err.status);

    console.error('Backend message:', err.error);

  }

});

}

}
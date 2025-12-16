import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from './authentication-service';
import { IRegister } from './interfaces';

@Component({
  selector: 'app-authentication',
  imports: [ReactiveFormsModule],
  templateUrl: './authentication.html',
  styleUrl: './authentication.scss',
})
export class Authentication implements OnInit{

  registerForm! : FormGroup

  private formBuilder = inject(FormBuilder)
  private authenticationService = inject(AuthenticationService)

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      age: [18, [Validators.required, Validators.min(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      address: ['somewhere', [Validators.required]],
      phone: ['+995599123456', [Validators.required]],
      gender: ['MALE', [Validators.required]]
    })

    console.log(this.registerForm)
  }

  register(){
    if (this.registerForm.valid) {
      let registerData = {
        ...this.registerForm.value,
        zipcode: '0178',
        avatar: 'https://api.dicebear.com/7.x/pixel-art/svg?seed=' + this.registerForm.value.firstName
      }

      this.authenticationService.signUp(registerData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response)

        },
        error: (error) => {
          console.error('Registration failed:', error)
          console.error('Error details:', error.error)

        }
      })
    } else {
      console.log('Form is invalid')
    }
  }
}

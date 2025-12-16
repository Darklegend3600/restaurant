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
      age: [0, [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      address: ['somewhere', [Validators.required]],
      phone: ['+995599123456', [Validators.required]],
      zipcode: ['0178', [Validators.required]],
      avatar: ['https://api.dicebear.com/7.x/pixel-art/svg?seed=Jane', [Validators.required]],
      gender: ['MALE', [Validators.required]]
    })

    console.log(this.registerForm)
  }

  register(){
    let registerData : IRegister = this.registerForm.value

    this.authenticationService.signUp(registerData).subscribe((response) => {
      console.log(response)
    })
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ISignIn, ISignUp } from './interfaces';

@Component({
  selector: 'app-authentication',
  imports: [ReactiveFormsModule],
  templateUrl: './authentication.html',
  styleUrl: './authentication.scss',
})
export class Authentication implements OnInit {
  private authenticationService = inject(AuthenticationService)

  form!: FormGroup

  private fb = inject(FormBuilder)
  private router = inject(Router)

  ngOnInit(): void {

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.pattern('^(?=.*[A-Z]).{8,}$'), Validators.required]]
    })
  }

  isInvalid(field: string){
    const control = this.form.get(field)

    return control!.invalid && control!.touched
  }

  register(){
    this.signUp(this.form.value)
  }

  signUp(formValue: any){

    let signUpInfo : ISignUp = {
      firstName: formValue.name,
      lastName: "Doe",
      age: 30,
      email: formValue.email,
      password: formValue.password,
      address: "somewhere",
      phone: "+995599123456",
      zipcode: "0178",
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=Jane",
      gender: "MALE"
    }

    this.authenticationService.signUp(signUpInfo).subscribe((response) => {
      console.log(response)
    })
  }

  signIn(){
    let signInInfo : ISignIn = {
          email: this.form.value.email,
          password: this.form.value.password
    }

    this.authenticationService.signIn(signInInfo).subscribe((response) => {
    console.log(response)
   })

   this.router.navigate(['/'])
  }
}

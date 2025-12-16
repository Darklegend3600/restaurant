import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ISignIn, ISignUp } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
    private http = inject(HttpClient)

  signUp(signUpInfo : ISignUp){
    return this.http.post<ISignUp>("https://api.everrest.educata.dev/auth/sign_up", signUpInfo)
  }

  signIn(signInInfo : ISignIn){
    return this.http.post<ISignIn>("https://api.everrest.educata.dev/auth/sign_in", signInInfo)
  }
}

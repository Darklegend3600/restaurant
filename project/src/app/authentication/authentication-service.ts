import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILogIn, IRegister } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private http = inject(HttpClient)

  signUp(registrationData: IRegister){
    return this.http.post<IRegister>("https://api.everrest.educata.dev/auth/sign_up", registrationData)
  }

  signIn(logInData: ILogIn){
    return this.http.post<ILogIn>("https://api.everrest.educata.dev/auth/sign_in", logInData)
  }
}

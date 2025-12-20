import { HttpClient } from '@angular/common/http';

import { inject, Injectable } from '@angular/core';

import { ILogIn } from './interfaces';

@Injectable({

providedIn: 'root',

})

export class AuthenticationService {

private http = inject(HttpClient);

signIn(logInData: ILogIn) {

return this.http.post("https://api.everrest.educata.dev/auth/sign_in", logInData);

}

signUp(registrationData: any) {

return this.http.post("https://api.everrest.educata.dev/auth/sign_up", registrationData);

}

}

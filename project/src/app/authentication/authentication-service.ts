import { HttpClient, HttpHeaders } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { IAuthTokens, ILogIn, IRegister } from './interfaces'

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private http = inject(HttpClient)

  private readonly ACCESS_TOKEN_KEY = 'everrest_access_token'
  private readonly REFRESH_TOKEN_KEY = 'everrest_refresh_token'

  signIn(logInData: ILogIn) {
    return this.http.post<IAuthTokens>(
      'https://api.everrest.educata.dev/auth/sign_in',
      logInData
    )
  }

  signUp(registrationData: IRegister & { avatar?: string }) {
    return this.http.post<IAuthTokens>(
      'https://api.everrest.educata.dev/auth/sign_up',
      registrationData
    )
  }

  saveTokens(tokens: IAuthTokens) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.access_token)
    localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refresh_token)
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY)
  }

  clearTokens() {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY)
    localStorage.removeItem(this.REFRESH_TOKEN_KEY)
  }

  getCurrentUser() {
    let token = this.getAccessToken()
    let headers = new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
      accept: 'application/json',
    })

    return this.http.get('https://api.everrest.educata.dev/auth', { headers })
  }
}

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

  signUp(registrationData: any) {
  return this.http.post('https://api.everrest.educata.dev/auth/sign_up', registrationData)
}

signIn(logInData: any) {
  return this.http.post<{ access_token: string; refresh_token: string }>(
    'https://api.everrest.educata.dev/auth/sign_in',
    logInData
  )
}


  saveTokens(tokens: IAuthTokens) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.access_token)
    localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refresh_token)
  }

  getAccessToken(): string | null {
  return localStorage.getItem('everrest_access_token')
  }
  getRefreshToken(): string | null {
    return localStorage.getItem('everrest_refresh_token')
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

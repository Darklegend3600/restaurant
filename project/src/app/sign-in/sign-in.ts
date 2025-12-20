import { Component, inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthenticationService } from '../authentication/authentication-service'
import { IAuthTokens, ILogIn } from '../authentication/interfaces'

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.scss',
})
export class SignIn implements OnInit {
  signInForm!: FormGroup
  errorMessage = ''

  private fb = inject(FormBuilder)
  private authService = inject(AuthenticationService)
  private router = inject(Router)
  private route = inject(ActivatedRoute)

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    })

    let email = this.route.snapshot.queryParamMap.get('email')
    if (email) this.signInForm.patchValue({ email })
  }

  signIn(): void {
    this.errorMessage = ''

    if (!this.signInForm.valid) {
      this.signInForm.markAllAsTouched()
      return
    }

    let loginData: ILogIn = {
      email: (this.signInForm.value.email || '').trim(),
      password: this.signInForm.value.password || '',
    }

    console.log('SIGN IN payload:', loginData)

    this.authService.signIn(loginData).subscribe({
      next: (tokens: IAuthTokens | any) => {

        console.log('SIGN IN response:', tokens)

        if (!tokens?.access_token || !tokens?.refresh_token) {
          console.error('Token response missing expected fields:', tokens)
          this.errorMessage = 'Login failed: token was not returned by the server.'
          return
        }

        this.authService.saveTokens(tokens)

        console.log('Saved access token:', this.authService.getAccessToken())

        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/home'
        this.router.navigate([returnUrl])
      },
      error: (err) => {
        console.error('Sign in failed:', err)
        console.error('Backend payload:', err?.error)
        console.error('Error keys:', err?.error?.errorKeys)

        if (err?.error?.error === 'Invalid credentials') {
          this.errorMessage = 'Invalid email or password.'
          return
        }

        this.errorMessage = 'Sign in failed. Please try again.'
      },
    })
  }
}

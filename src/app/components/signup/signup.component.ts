import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  constructor(private FormBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.FormBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(1)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }
  onSubmit() {
    if (this.signupForm.valid) {
      this.authService.signup(this.signupForm.value).subscribe(response => {
        console.log(response);
        this.authService.setToken(response.token); 
        console.log(localStorage.getItem('auth-token'));
        this.router.navigate(['/products']);
      });
    }
    else {
      console.log('Form not valid');
    }
  }
}

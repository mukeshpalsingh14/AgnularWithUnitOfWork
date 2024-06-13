import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  token: string | undefined;
  constructor(private FormBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.FormBuilder.group({
      lastName: [''],
      firstName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }
  ngOnInit(): void { }
  onSubmit() {
    if (this.loginForm.valid) {
      // console.log('Form Submitted!', this.loginForm.value);
      this.authService.login(this.loginForm.value).subscribe((response) => {
        this.token = response.token;
        this.authService.setToken(response.token);
        this.router.navigate(['/home']);
      });
     
    } else {
      console.log('Form not valid');
    }
  }
}

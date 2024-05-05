import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../core/services/users/user.service';
import { LoginVerifyService } from '../../core/services/login/login-verify.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private userServie: UserService,
    private router: Router,
    private verifyLogin: LoginVerifyService
  ) {}
  formLogin!: FormGroup;

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit() {
    if (!this.formLogin.valid) {
      alert('Please fill all the required fields');
    }

    this.userServie.login(this.formLogin.value).subscribe({
      next: (data) => {
        sessionStorage.setItem('token', data.Authorization);
        localStorage.setItem('name', data.data.name);
        localStorage.setItem('email', data.data.email);
        if (this.verifyLogin.verifyLogin()) {
          setTimeout(() => {
            this.router.navigate(['/users']);
          }, 300);
        }
      },
      error: (error) => {
        alert('Error');
      },
    });
  }
}

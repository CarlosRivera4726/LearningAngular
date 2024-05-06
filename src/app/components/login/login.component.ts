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
    this.userServie.login(this.formLogin.value).subscribe({
      next: (data) => {
        sessionStorage.setItem('token', data.Authorization);
        localStorage.setItem('name', data.data.name);
        localStorage.setItem('email', data.data.email);
        localStorage.setItem('role', data.data.role);
        if (this.verifyLogin.verifyLogin()) {
          setTimeout(async () => {
            await this.router.navigate(['/users']);
          }, 500);
        }
      },
      error: (error) => {
        alert(
          'El usuario no se encuentra registrado o la contraseña no es valida'
        );
        console.error(error);
      },
    });
  }
}

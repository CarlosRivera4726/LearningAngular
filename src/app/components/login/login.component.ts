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
import { LoginService } from '../../core/services/login/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private loginService: LoginService) {}
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
    this.loginService.login(this.formLogin.value).subscribe({
      next: (login) => {
        //console.log(login);
        sessionStorage.setItem('token', login.Authorization);
        localStorage.setItem('name', login.data.name);
        localStorage.setItem('email', login.data.email);

        const rolSepareted = login.data.roles
          .map((roles: any) => roles.name)
          .join(', ');
        localStorage.setItem('role', rolSepareted);
        this.router.navigate(['/users']);
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

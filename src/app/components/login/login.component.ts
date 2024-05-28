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
import { initFlowbite } from 'flowbite';
import { ErrorAlertComponent } from '../messages/error-alert/error-alert.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, ErrorAlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  protected message: string = '';
  protected showMessage: boolean = false;
  constructor(private router: Router, private loginService: LoginService) {}
  formLogin!: FormGroup;

  ngOnInit(): void {
    initFlowbite();
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
        localStorage.setItem('id', login.data.id);

        const rolSepareted = login.data.roles
          .map((roles: any) => roles.name)
          .join(', ');
        localStorage.setItem('role', rolSepareted);
        if (rolSepareted.includes('ADMINISTRADOR')) {
          this.router.navigate(['/users']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (error) => {
        this.message =
          'El usuario no se encuentra registrado o la contraseña no es valida.';
        this.showMessage = true;
        setTimeout(() => {
          this.showMessage = false;
        }, 5000);
      },
    });
  }
}

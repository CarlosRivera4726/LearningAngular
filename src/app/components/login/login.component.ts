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
import { SharedService } from '../../core/services/shared/shared.service';

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
  constructor(private router: Router, private loginService: LoginService, private sharedService: SharedService) {}
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
        this.sharedService.emitAuthChange(true);
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

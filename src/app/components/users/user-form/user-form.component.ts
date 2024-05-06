import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUser } from '../../../core/interfaces/users/iuser';
import { UserService } from '../../../core/services/users/user.service';
import { MessageComponent } from '../../messages/message/message.component';
import { JsonPipe, NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import { LoginVerifyService } from '../../../core/services/login/login-verify.service';
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MessageComponent,
    NgStyle,
    JsonPipe,
  ],
  providers: [UserService],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.less',
})
export class UserFormComponent implements OnInit {
  constructor(
    private userService: UserService,
    private verifyLogin: LoginVerifyService
  ) {}
  router: Router = new Router();
  userForm!: FormGroup;
  message: string = '';
  style!: string;
  newUser!: IUser;

  @Output() userAdded!: EventEmitter<IUser>;

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  onSubmit(): void {
    if (!this.userForm.valid) {
      this.message = 'Please fill all the required fields';
      this.style =
        'p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300';
    }
    if (this.userForm.value.password.length < 8) {
      this.message = 'La contraseña debe tener al menos 8 caracteres';
      this.style =
        'p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300';
    } else if (
      this.userForm.value.password !== this.userForm.value.confirmPassword
    ) {
      this.message = 'Contraseña y Confirmar contraseña deben ser iguales';
      this.style =
        'p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300';
    } else {
      this.newUser = {
        ...this.userForm.value,
      };
      this.addUser(this.newUser);
      this.userForm.reset();
    }
  }

  addUser(newUser: IUser) {
    this.userService.addUser(newUser).subscribe({
      next: (data) => {
        this.message = 'Usuario agregado correctamente!';
        this.style =
          'p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-300';
        setTimeout(() => {
          if (this.verifyLogin.verifyLogin()) {
            this.router.navigate(['/users']);
          } else {
            this.router.navigate(['/login']);
          }
        }, 300);
      },
      error: (error) => {
        this.message = 'Error al agregar el usuario';
        this.style =
          'p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-300';
      },
    });
  }

  get password() {
    return this.userForm.get('password');
  }
}

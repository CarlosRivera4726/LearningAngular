import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUser, Rol } from '../../../core/interfaces/users/iuser';
import { UserService } from '../../../core/services/users/user.service';
import { MessageComponent } from '../../messages/message/message.component';
import { JsonPipe, NgStyle } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../core/services/login/login.service';
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
    private formBuilder: FormBuilder,
    private verifyLogin: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  title: string = 'Agregar Usuario';
  userForm!: FormGroup;
  message: string = '';
  style!: string;
  newUser!: IUser;
  id!: string;
  isAddMode?: boolean = true;
  isSubmitted?: boolean = false;
  role = localStorage.getItem('role');
  @Output() userAdded!: EventEmitter<IUser>;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (this.router.url.includes('register')) {
      this.isAddMode = true;
      this.title = 'Registro de Usuario';
    }

    console.log('isAddMode: ', this.isAddMode);

    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      role: ['', [Validators.required]],
      password: [
        '',
        this.isAddMode
          ? [Validators.required, Validators.minLength(8)]
          : [Validators.nullValidator],
      ],
      confirmPassword: [
        '',
        this.isAddMode
          ? [Validators.required, Validators.minLength(8)]
          : [Validators.nullValidator],
      ],
    });
    if (!this.isAddMode) {
      this.title = 'Editar Usuario';
      this.userService.getUser(this.id).subscribe({
        next: (data: IUser) => {
          data.password = '';
          this.userForm.patchValue(data);
        },
        error: (error) => {
          this.message = 'Error al obtener el usuario';
          this.style =
            'p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-300';
        },
      });
    }
  }
  get f() {
    return this.userForm.controls;
  }

  onSubmit(): void {
    this.isSubmitted = true;
    if (this.userForm.invalid) {
      this.style =
        'p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300';
      this.message = 'Por favor, complete todos los campos!';
      return;
    }

    if (this.isAddMode) {
      const user = this.userForm.value;
      console.info(user);
      this.addUser(this.userForm.value);
    } else {
      this.updateUser();
    }
  }

  onClose(event: any) {
    setInterval(() => {
      this.message = '';
      this.style = '';
    }, 500);
  }

  updateUser() {
    const user: IUser = {
      ...this.userForm.value,
    };
    this.userService.updateUser(this.id, user).subscribe({
      next: (data: IUser) => {
        setTimeout(() => {
          this.message = 'Usuario actualizado correctamente!';
          this.style =
            'p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-300';
          this.router.navigate(['/users']);
        }, 600);
      },
    });
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
        }, 600);
      },
      error: (error) => {
        this.message = 'Error al agregar el usuario';
        this.style =
          'p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-300';
      },
    });
  }
}

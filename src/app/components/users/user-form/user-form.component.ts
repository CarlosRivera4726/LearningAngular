import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUser, Rol } from '../../../core/interfaces/users/iuser';
import { UserService } from '../../../core/services/users/user.service';
import { JsonPipe, NgStyle } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../core/services/login/login.service';
import { RolService } from '../../../core/services/roles/rol.service';
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgStyle, JsonPipe],
  providers: [UserService],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.less',
})
export class UserFormComponent implements OnInit {
  constructor(
    private userService: UserService,
    private rolesService: RolService,
    private formBuilder: FormBuilder,
    private verifyLogin: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  title: string = 'Agregar Usuario';
  userForm!: FormGroup;
  message: string = '';
  isError!: boolean;
  style!: string;
  newUser!: IUser;
  id!: string;
  isAddMode?: boolean = true;
  isSubmitted?: boolean = false;
  roles!: Rol[];
  isAdmin = localStorage.getItem('role')?.includes('ADMINISTRADOR')
    ? true
    : false;
  roleLogged = localStorage.getItem('role') || 'USUARIO';
  @Output() userAdded!: EventEmitter<IUser>;

  ngOnInit(): void {
    this.getRoles();
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    if (this.router.url.includes('register')) {
      this.isAddMode = true;
      this.title = 'Registro de Usuario';
    }

    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      roles: ['', [Validators.required]],
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
      user.roles = [{ name: this.userForm.value.roles }];
      this.addUser(user);
    } else {
      this.updateUser();
    }
  }

  updateUser() {
    const user: IUser = {
      ...this.userForm.value,
      roles: [{ id: this.userForm.value.roles }],
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
    console.log(newUser);
    //newUser.roles.push({ id: this.userForm.value.roles });
    this.userService.addUser(newUser).subscribe({
      next: (data) => {
        this.isError = false;
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
        console.log(error);
        this.isError = true;
        this.message = 'Error al agregar el usuario: ' + error.headers.message;
        this.style =
          'p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-300';
      },
    });
  }

  getRoles() {
    this.rolesService.getRoles().subscribe({
      next: (data) => {
        console.log(data);
        this.roles = data;
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
  }

  rolesToShow() {
    if (!this.roles) {
      return []; // Si los roles aún no se han cargado, retorna un array vacío
    }
    if (this.isAdmin) {
      return this.roles;
    } else {
      return this.roles.filter(
        (rol) =>
          rol.name?.toLowerCase() === 'usuario' ||
          this.roleLogged?.includes(rol.name?.toLowerCase() || '')
      );
    }
  }
}

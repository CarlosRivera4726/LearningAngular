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
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  providers: [UserService],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.less',
})
export class UserFormComponent implements OnInit {
  constructor(private userService: UserService) {}
  userForm!: FormGroup;

  @Output() userAdded!: EventEmitter<IUser>;

  ngOnInit(): void {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
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
    if (this.userForm.value.password !== this.userForm.value.confirmPassword) {
      if (this.userForm.valid) {
        //this.userAdded.emit();
        //this.userForm.reset();
      }
    }
  }
}

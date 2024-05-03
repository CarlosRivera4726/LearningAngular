import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/users/user.service';
import { IUser } from '../../../core/interfaces/users/iuser';
import { Router, RouterLink } from '@angular/router';
import { ChangeCharPipe } from '../../../core/pipes/change-char.pipe';
import { LimitCharPipe } from '../../../core/pipes/limit-char.pipe';
import { JsonPipe } from '@angular/common';
import { UnauthorizedComponent } from '../../unauthorized/unauthorized.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    RouterLink,
    ChangeCharPipe,
    LimitCharPipe,
    JsonPipe,
    UnauthorizedComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.less',
})
export class UserListComponent implements OnInit {
  token = sessionStorage.getItem('token');
  users!: IUser[];
  ngOnInit(): void {
    this.getUsers();
  }

  constructor(private userService: UserService) {}

  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error(err);
        this.users = [];
      },
    });
  }

  deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.ngOnInit();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/users/user.service';
import { IUser } from '../../../core/interfaces/users/iuser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.less',
})
export class UserListComponent implements OnInit {
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

import { Component, OnInit } from '@angular/core';
import { UsersService } from '../_services/users.service';
import { User } from '../_models/User';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'phone', 'email', 'actions'];
  dataSource: User[] = [];

  constructor(
    private _snackBar: MatSnackBar,
    public usersService: UsersService,) { }


  ngOnInit() { this.getUsers(); }



  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'bottom',
      panelClass: ['snack']
    });
  }


  getUsers() {

    this.usersService.getUsers().subscribe(
      {
        next: (v: User[]) => this.dataSource = v,
        error: (e: any) => console.error(e),
        complete: () => console.info('complete')
      }
    )

  }

  deleteUser(id: string) {

    this.openSnackBar('User  deleted', 'List')

    this.usersService.deleteUser(id).subscribe(
      {
        next: (v: User[]) => console.log(v),
        error: (e: any) => console.error(e),
        complete: () => this.getUsers()
      }
    )
  }


}

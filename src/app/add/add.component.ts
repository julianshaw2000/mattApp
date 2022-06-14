import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../_models/User';
import { UsersService } from '../_services/users.service';




@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {


  profileForm = new FormGroup({
    firstName: new FormControl('', [Validators.minLength(2), Validators.maxLength(15), Validators.required]),
    lastName: new FormControl('', [Validators.minLength(2), Validators.maxLength(15), Validators.required]),
    email: new FormControl('', [Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern("^[0-9]{3}[\-]?[0-9]{3}[\-]?[0-9]{4}$")]),
    address: new FormControl('', [Validators.minLength(8), Validators.maxLength(50)]),
    message: new FormControl('', [Validators.minLength(8), Validators.maxLength(200)]),
  });


  validationMessages = {
    firstName:
      [
        { type: 'minlength', message: 'Must have at least 2 characters long' },
        { type: 'maxlength', message: 'Must have less than 15 characters long' },
        { type: 'required', message: 'First name is required' }
      ],
    lastName:
      [
        { type: 'minlength', message: 'Must have at least 2 characters long' },
        { type: 'maxlength', message: 'Must have less than 15 characters long' },
        { type: 'required', message: 'Last name is required' }
      ],

    address:
      [
        { type: 'minlength', message: 'Must have at least 8 characters long' },
        { type: 'maxlength', message: 'Must have less than 50 characters long' },
      ],

    message:
      [
        { type: 'minlength', message: 'Must have at least 8 characters long' },
        { type: 'maxlength', message: 'Must have less than 200 characters long' },
      ],


    phone:
      [
        { type: 'required', message: 'phone number is required' },
        { type: 'pattern', message: 'invalid phone number' },
      ],

    email:
      [
        { type: 'email', message: 'invalid email' },
      ],


  };

  constructor(
    private _snackBar: MatSnackBar,
    private router: Router,
    private userService: UsersService) { }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'bottom',
      panelClass: ['snack']
    });
  }


  onSubmit() {

    if (this.profileForm.valid) {
      console.warn('is valid')
      this.openSnackBar('Data added', 'Editor')
      this.userService.saveUser(this.profileForm.value).subscribe(
        {
          next: (v: User[]) => console.log(v),
          error: (e: any) => console.error(e),
          complete: () => {

            this.profileForm?.reset();
            this.router.navigate(['/users'])
          }
        }
      )
    }
    else {
      console.warn('not valid')
      this.openSnackBar('Edits canceled', 'Editor')

      this.profileForm?.reset();
      this.router.navigate(['/users'])
    }


  }

}

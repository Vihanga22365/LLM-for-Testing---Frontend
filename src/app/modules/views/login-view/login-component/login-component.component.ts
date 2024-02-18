import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { set } from 'date-fns';
import { th } from 'date-fns/locale';
import { Subscription } from 'rxjs';
import { LoggedUserData } from 'src/app/core/models/login-data.model';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.scss'],
})
export class LoginComponentComponent implements OnInit {
  userLoginForm!: FormGroup;
  usernameFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  loginUserSubscription$!: Subscription;

  constructor(private _formBuilder: FormBuilder, private _loginService: LoginService, private _snackBar: MatSnackBar, private router: Router) {}

  ngOnInit(): void {
    this.userLoginForm = this._formBuilder.group({
      username: this.usernameFormControl,
      password: this.passwordFormControl,
    });
  }

  openSnackBar(message: any, emoji: any) {
    this._snackBar.open(message, emoji, {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      // duration: 3000,
    });
  }

  submitLoginForm() {
    if (this.userLoginForm.valid) {
      this.loginUserSubscription$ = this._loginService.loginUser(this.userLoginForm.getRawValue()).subscribe({
        next: (response) => {
          if (response.status === 'OK') {
            let userDetails: LoggedUserData = response.data;
            localStorage.setItem('logUserId', userDetails.logUserId);
            localStorage.setItem('logUserFirstName', userDetails.logUserFirstName);
            localStorage.setItem('logUserLastName', userDetails.logUserLastName);
            localStorage.setItem('logUserType', userDetails.logUserType);
            localStorage.setItem('logUserEmployeeType', userDetails.logUserEmployeeType);

            let message = response.message;
            this.openSnackBar(message, '😋');
            setTimeout(() => {
              this.router.navigate(['/panel/dashboard']);
            }, 500);
          } else {
            let message = 'Login Unsuccessful';
            this.openSnackBar(message, '😭');
          }
        },
        error: (err) => {
          console.log(err);
          let message = 'Login Unsuccessful';
          this.openSnackBar(message, '😭');
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.loginUserSubscription$?.unsubscribe();
  }
}

export class PizzaPartyAnnotatedComponent {
  snackBarRef = inject(MatSnackBarRef);
}

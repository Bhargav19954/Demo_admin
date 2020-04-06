
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';
import { SnackbarService } from '../shared/snackbar/snackbar.service';
// import { ToastrService } from 'ngx-toastr';

@Component(
  {
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css'],
  })

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  invalid = false;
  isSubmitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private loginService: LoginService,
    private snackbarService: SnackbarService,
   //  private toaster: ToastrService
  ) {

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login() {
    this.isSubmitted = true;
    this.invalid = false;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    const { email, password } = this.loginForm.value;

    this.loading = true;
    this.loginService.login(email, password).subscribe(
      (data: any) => {
        if (data.code === 0) {
          // tslint:disable-next-line: ter-max-len
          const { id, email, is_admin, first_name, last_name, city, state, mobile, address } = data.data;
          const userData: any = {
            id, email, is_admin, first_name, last_name, city, state, mobile, address,
          };
          localStorage.setItem('userInfo', JSON.stringify(userData));
          if (data.data.is_admin) {
            this.router.navigate(['dashboard']);
          } else {
            this.router.navigate([`profile/${userData.id}`]);
          }
        } else {
          return;
        }
      }, (error) => {
        this.invalid = true;
      return;
    });
  }

  clear(){
    this.invalid = false;
  }
}

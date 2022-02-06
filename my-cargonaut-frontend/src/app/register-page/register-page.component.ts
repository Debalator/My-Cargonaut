import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { LoginServiceService } from '../login-page/login-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
    constructor(
        private api: ApiService,
        private loginService: LoginServiceService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {}

    registerForm = new FormGroup({
        username: new FormControl(''),
        email: new FormControl(''),
        birthdate: new FormControl(''),
        password: new FormControl(''),
    });

    ngOnInit(): void {
        this.registerForm;
    }

    register() {
        var username = this.registerForm.value.username;
        var email = this.registerForm.value.email;
        var birthdate = this.registerForm.value.birthdate;
        var password = this.registerForm.value.password;

        this.api
            .post('api/users', {
                username: username,
                birthDate: birthdate,
                mail: email,
                password,
            })
            .subscribe({
                next: (res: any) => {},
                error: (e: any) => {
                    console.error(e);
                    this.displayError();
                },
                complete: () => {
                    this.login();
                    console.info('complete');
                },
            });
    }

    login() {
        var username = this.registerForm.value.username;
        var password = this.registerForm.value.password;

        this.api
            .post('/api/auth/login', { username: username, password: password })
            .subscribe({
                next: (res: any) => {
                    //console.log(res);
                    this.loginService.jwt = res.access_token;
                    this.loginService.id = res.id;
                    this.loginService.username = res.username;
                    //window.localStorage.setItem('jwt', res.access_token);
                },
                error: (e: any) => this.displayError(),
                complete: () => {
                    console.info('complete');
                    this.router.navigateByUrl('/profil');
                },
            });
    }

    displayError() {
        var message =
            'Please check if all form fields are filled out. Otherwise the email or username might not be unique';
        this.snackBar.open(message, 'Dismiss', {
            duration: 3000,
        });
    }
}

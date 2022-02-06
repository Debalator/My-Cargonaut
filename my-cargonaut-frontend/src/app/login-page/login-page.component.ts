import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginServiceService } from './login-service.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
    username: string = '';

    constructor(
        private api: ApiService,
        private loginService: LoginServiceService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {}

    loginForm = new FormGroup({
        username: new FormControl(''),
        password: new FormControl(''),
    });

    ngOnInit(): void {
        this.loginForm;
    }

    save() {
        var username = this.loginForm.value.username;
        var password = this.loginForm.value.password;

        this.api
            .post('/api/auth/login', { username: username, password: password })
            .subscribe({
                next: (res: any) => {
                    const { id, access_token } = res;
                    this.loginService.jwt = access_token;
                    this.loginService.id = id;
                    this.loginService.username = username;
                },
                error: (e: any) => {
                    console.error(e);
                    this.displayError();
                },
                complete: () => {
                    console.info('complete');
                    this.router.navigateByUrl('/profil');
                },
            });
    }

    displayError() {
        var message = 'Username or Password is wrong';
        this.snackBar.open(message, 'Dismiss', {
            duration: 3000,
        });
    }
}

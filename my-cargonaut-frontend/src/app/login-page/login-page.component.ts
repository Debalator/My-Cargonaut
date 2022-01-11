import { prepareEventListenerParameters } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api/api.service';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInput } from '@angular/material/input';
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
        private formBuilder: FormBuilder,
        private loginService: LoginServiceService
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
                error: (e: any) => console.error(e),
                complete: () => console.info('complete'),
            });
    }
}

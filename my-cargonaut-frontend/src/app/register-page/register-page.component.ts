import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { LoginServiceService } from '../login-page/login-service.service';

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
    constructor(
        private api: ApiService, 
        private formBuilder: FormBuilder,
        private loginService: LoginServiceService,
        private router : Router
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

        console.log(username, password, birthdate, email);

        this.api
            .post('api/users', {
                username: username,
                birthDate: birthdate,
                mail: email,
                password,
            })
            .subscribe({
                next: (res: any) => {
                    console.log(res);
                },
                error: (e: any) => console.error(e),
                complete: () => {
                    this.login()
                    console.info('complete')
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
                    console.log("hello");
                    this.router.navigateByUrl('/');
                    //window.localStorage.setItem('jwt', res.access_token);
                },
                error: (e: any) => console.error(e),
                complete: () => console.info('complete'),
            });
    }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoginServiceService {
    jwtValue = new BehaviorSubject(this.jwt);

    clear() {
        this.jwt = '';
        localStorage.removeItem('id');
        localStorage.removeItem('username');
    }

    set id(id: string) {
        localStorage.setItem('id', id);
    }

    get id() {
        return localStorage.getItem('id') || '';
    }

    set username(username: string) {
        localStorage.setItem('username', username);
    }

    get username() {
        return localStorage.getItem('username') || '';
    }

    set jwt(value: string) {
        this.jwtValue.next(value);
        localStorage.setItem('jwt', value);
    }

    get jwt() {
        return localStorage.getItem('jwt') || '';
    }
}

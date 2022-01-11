import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoginServiceService {
    jwtValue = new BehaviorSubject(this.jwt);

    set jwt(value: string) {
        this.jwtValue.next(value);
        localStorage.setItem('jwt', value);
    }

    get jwt() {
        return localStorage.getItem('jwt') || '';
    }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { LoginPageComponent } from './login-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../api/api.service';
import { of } from 'rxjs';

describe('LoginPageComponent', () => {
    let component: LoginPageComponent;
    let fixture: ComponentFixture<LoginPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LoginPageComponent],
            imports: [
                HttpClientTestingModule,
                MatSnackBarModule,
                RouterTestingModule,
            ],
            providers: [
                {
                    provide: ApiService,
                    useValue: apiServiceStub,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

const apiServiceStub = {
    post(url: string, body: any | null, options?: any) {
        return of(url);
    },
    delete(url: string, body: any | null, options?: any) {
        return of(url);
    },
    put(url: string, body: any | null, options?: any) {
        return of(url);
    },
    get(url: string, options?: any) {
        return of([url]);
    },
};

const loginServiceStub = {
    jwt: '',
    id: '',
    username: '',
};

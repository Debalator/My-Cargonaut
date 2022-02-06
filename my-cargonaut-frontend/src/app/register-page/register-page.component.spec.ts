import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RegisterPageComponent } from './register-page.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../api/api.service';
import { of } from 'rxjs';
import { LoginServiceService } from '../login-page/login-service.service';

describe('RegisterPageComponent', () => {
    let component: RegisterPageComponent;
    let fixture: ComponentFixture<RegisterPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RegisterPageComponent],
            imports: [MatSnackBarModule, RouterTestingModule],
            providers: [
                {
                    provide: ApiService,
                    useValue: apiServiceStub,
                },
                {
                    provide: LoginServiceService,
                    useValue: loginServiceStub,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterPageComponent);
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

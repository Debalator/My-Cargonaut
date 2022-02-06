import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { ApiService } from '../api/api.service';
import { LoginServiceService } from '../login-page/login-service.service';

import { RequestsComponent } from './requests.component';

describe('RequestsComponent', () => {
    let component: RequestsComponent;
    let fixture: ComponentFixture<RequestsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RequestsComponent],
            imports: [MatDialogModule, RouterTestingModule],
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
        fixture = TestBed.createComponent(RequestsComponent);
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
    jwtValue: new BehaviorSubject(''),
};

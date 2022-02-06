import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { from, of } from 'rxjs';
import { ApiService } from '../api/api.service';
import { LoginServiceService } from '../login-page/login-service.service';

import { OrderComponent } from './order.component';

describe('OrderComponent', () => {
    let component: OrderComponent;
    let fixture: ComponentFixture<OrderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OrderComponent],
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
        fixture = TestBed.createComponent(OrderComponent);
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
        return from({
            id: '',
            creator: {
                username: '',
            },
            created: '',
            status: '',
        } as any);
    },
};

const loginServiceStub = {
    id: '',
    username: '',
};

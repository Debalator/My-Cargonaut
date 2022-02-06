import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { ApiService } from '../api/api.service';

import { OrderRequestComponent } from './order-request.component';

describe('OrderRequestComponent', () => {
    let component: OrderRequestComponent;
    let fixture: ComponentFixture<OrderRequestComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OrderRequestComponent],
            imports: [MatSnackBarModule],
            providers: [
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        ActionButton: 'Test',
                        SupportingText: 'Test',
                    },
                },
                {
                    provide: MatDialogRef,
                    useValue: { close: (_: any) => {} },
                },
                {
                    provide: ApiService,
                    useValue: apiServiceStub,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderRequestComponent);
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

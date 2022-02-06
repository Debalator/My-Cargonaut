import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ApiService } from '../api/api.service';

import { OrderOfferComponent } from './order-offer.component';

describe('OrderOfferComponent', () => {
    let component: OrderOfferComponent;
    let fixture: ComponentFixture<OrderOfferComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OrderOfferComponent],
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
        fixture = TestBed.createComponent(OrderOfferComponent);
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

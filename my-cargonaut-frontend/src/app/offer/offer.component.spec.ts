import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferComponent } from './offer.component';

describe('OfferComponent', () => {
    let component: OfferComponent;
    let fixture: ComponentFixture<OfferComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OfferComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OfferComponent);
        component = fixture.componentInstance;
        component.offer = {
            price: '',
            startDate: '',
            destDate: '',
            startAddress: {
                zip: '',
                city: '',
                country: '',
            },
            destAddress: {
                zip: '',
                city: '',
                country: '',
            },
            creator: {
                id: '',
                username: '',
            },
            vehicle: {
                brand: '',
                model: '',
                loadingArea: '',
                seats: '',
            },
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

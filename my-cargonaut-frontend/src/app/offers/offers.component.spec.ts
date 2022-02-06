import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, of } from 'rxjs';
import { ApiService } from '../api/api.service';

import { OffersComponent } from './offers.component';

describe('OffersComponent', () => {
    let component: OffersComponent;
    let fixture: ComponentFixture<OffersComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OffersComponent],
            imports: [MatDialogModule, RouterTestingModule],
            providers: [
                {
                    provide: ApiService,
                    useValue: apiServiceStub,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OffersComponent);
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

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { ApiService } from '../api/api.service';

import { RatingComponent } from './rating.component';

describe('RatingComponent', () => {
    let component: RatingComponent;
    let fixture: ComponentFixture<RatingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RatingComponent],
            imports: [MatSnackBarModule],
            providers: [
                {
                    provide: ApiService,
                    useValue: apiServiceStub,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RatingComponent);
        component = fixture.componentInstance;
        component.order = {
            rating: {
                title: '',
                description: '',
                stars: '',
            },
        };
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

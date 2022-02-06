import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { RequestItemsComponent } from './request-items.component';

describe('RequestItemsComponent', () => {
    let component: RequestItemsComponent;
    let fixture: ComponentFixture<RequestItemsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RequestItemsComponent],
            imports: [MatSnackBarModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(RequestItemsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

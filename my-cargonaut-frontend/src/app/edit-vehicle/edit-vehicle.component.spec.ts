import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { ApiService } from '../api/api.service';

import { EditVehicleComponent } from './edit-vehicle.component';

describe('EditVehicleComponent', () => {
    let component: EditVehicleComponent;
    let fixture: ComponentFixture<EditVehicleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [EditVehicleComponent],
            imports: [MatSnackBarModule],
            providers: [
                {
                    provide: MatDialogRef,
                    useValue: { close: (_: any) => {} },
                },
                {
                    provide: MAT_DIALOG_DATA,
                    useValue: {
                        ActionButton: 'Test',
                        SupportingText: 'Test',
                    },
                },
                {
                    provide: ApiService,
                    useValue: apiServiceStub,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(EditVehicleComponent);
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

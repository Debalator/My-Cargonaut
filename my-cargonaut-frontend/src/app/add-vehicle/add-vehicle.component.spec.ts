import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { ApiService } from '../api/api.service';

import { AddVehicleComponent } from './add-vehicle.component';

describe('AddVehicleComponent', () => {
    let component: AddVehicleComponent;
    let fixture: ComponentFixture<AddVehicleComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AddVehicleComponent],
            imports: [MatDialogModule, MatSnackBarModule],
            providers: [
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
        fixture = TestBed.createComponent(AddVehicleComponent);
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
};

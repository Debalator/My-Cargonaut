import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
    MatDialogModule,
    MatDialogRef,
    MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { AdditemComponent } from './additem.component';

describe('AdditemComponent', () => {
    let component: AdditemComponent;
    let fixture: ComponentFixture<AdditemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AdditemComponent],
            imports: [MatDialogModule],
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
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AdditemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

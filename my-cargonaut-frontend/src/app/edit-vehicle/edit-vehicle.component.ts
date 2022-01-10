import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Car } from '../car-management/car-management.component';

@Component({
    selector: 'app-edit-vehicle',
    templateUrl: './edit-vehicle.component.html',
    styleUrls: ['./edit-vehicle.component.scss'],
})
export class EditVehicleComponent {
    constructor(
        public dialogRef: MatDialogRef<EditVehicleComponent>,
        @Inject(MAT_DIALOG_DATA) public dataVehicle: Car
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}

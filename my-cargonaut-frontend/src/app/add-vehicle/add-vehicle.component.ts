<<<<<<< HEAD
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Car } from '../car-management/car-management.component';

@Component({
    selector: 'app-add-vehicle',
    templateUrl: './add-vehicle.component.html',
    styleUrls: ['./add-vehicle.component.scss'],
})
export class AddVehicleComponent {
    constructor(
        public dialogRef: MatDialogRef<AddVehicleComponent>,
        @Inject(MAT_DIALOG_DATA) public dataVehicle: Car
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
=======
import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Car } from "../car-management/car-management.component";

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent {

  constructor(public dialogRef: MatDialogRef<AddVehicleComponent>,
    @Inject(MAT_DIALOG_DATA) public dataVehicle: Car) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

>>>>>>> 81f6c490483fc084b2ce08b2f0a7acf1712c86b9
}

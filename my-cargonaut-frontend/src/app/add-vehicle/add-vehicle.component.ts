import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from "../api/api.service";

@Component({
    selector: 'app-add-vehicle',
    templateUrl: './add-vehicle.component.html',
    styleUrls: ['./add-vehicle.component.scss'],
})
export class AddVehicleComponent {
  brand = '';
  model = '';
  seats = 0;
  loadingArea = 0;

    constructor(
      public api: ApiService,
        public dialogRef: MatDialogRef<AddVehicleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { car: any }
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    saveCar(){
      console.log('Car saved');

      this.api.post('/api/vehicles', {
        brand: this.brand,
        model: this.model,
        seats: this.seats,
        loadingArea: this.loadingArea,
      }).subscribe((order) => {
        this.dialogRef.close(order);
      });

    }
}

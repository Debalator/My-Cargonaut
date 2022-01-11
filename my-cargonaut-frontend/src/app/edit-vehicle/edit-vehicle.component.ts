import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../api/api.service';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-edit-vehicle",
  templateUrl: "./edit-vehicle.component.html",
  styleUrls: ["./edit-vehicle.component.scss"],
})
export class EditVehicleComponent {
  brand = null;
  model = null;
  seats = null;
  loadingArea = null;

  constructor(
    private snackbar: MatSnackBar,
    public api: ApiService,
    public dialogRef: MatDialogRef<EditVehicleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { carid: any }
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveCar() {
    console.log('Car saved');
    console.log(this.data.carid);

    //   this.api.get(`api/vehicles/${this.data.carid}`).subscribe({
    //   next: (res: any) => {
    //     if (this.brand == null) this.brand = res.brand;
    //     if (this.model == null) this.model = res.model;
    //     if (this.seats == null) this.seats = res.seats;
    //     if (this.loadingArea == null) this.loadingArea = res.loadingArea;
    //   },
    //   error: (e: any) => console.error('get vehicles' + e),
    //   complete: () => console.info('complete'),
    // });

    this.api
      .patch(`api/vehicles/${this.data.carid}`, {
        brand: this.brand,
        model: this.model,
        seats: this.seats,
        loadingArea: this.loadingArea,
      })
      .subscribe((order) => {
        this.dialogRef.close(order);
      });
  }
}

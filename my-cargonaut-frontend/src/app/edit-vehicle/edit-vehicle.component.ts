import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../api/api.service';

@Component({
    selector: 'app-edit-vehicle',
    templateUrl: './edit-vehicle.component.html',
    styleUrls: ['./edit-vehicle.component.scss'],
})
export class EditVehicleComponent implements OnInit {
    brand = '';
    model = '';
    seats = 0;
    loadingArea = 0;

    constructor(
        public api: ApiService,
        public dialogRef: MatDialogRef<EditVehicleComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { car: any }
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    saveCar() {
        console.log('Car saved');

        this.api
            .patch(`api/vehicles/${this.data.car.id}`, {
                brand: this.brand,
                model: this.model,
                seats: this.seats,
                loadingArea: this.loadingArea,
            })
            .subscribe((order) => {
                this.dialogRef.close(order);
            });
    }

    //TODO!!!
    ngOnInit(): void {
        this.api.get(`/api/vehicles/${this.data.car.id}`, (thiscar: any) => {
            this.brand = thiscar.brand;
            this.model = thiscar.model;
            this.seats = thiscar.seats;
            this.loadingArea = thiscar.loadingArea;
        });
    }
}

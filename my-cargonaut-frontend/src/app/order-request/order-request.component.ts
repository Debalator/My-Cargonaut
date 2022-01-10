import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../api/api.service';

@Component({
    selector: 'app-order-request',
    templateUrl: './order-request.component.html',
    styleUrls: ['./order-request.component.scss'],
})
export class OrderRequestComponent {
    vehicle: any = null;

    constructor(
        public api: ApiService,
        public dialogRef: MatDialogRef<OrderRequestComponent>,
        public snackbar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) public data: { request: any }
    ) {}

    applyVehicle(vehicle: any) {
        this.vehicle = vehicle;
    }

    cancel() {
        this.dialogRef.close(null);
    }

    book() {
        console.log('ORDERED');

        console.log(this.vehicle);

        if (!this.vehicle)
            this.snackbar.open('Bitte Fahrzeug wählen', '', {
                duration: 2000,
            });
        else if (this.vehicle.seats < this.data.request.persons)
            this.snackbar.open('Nicht genügend Plätze', '', {
                duration: 2000,
            });
        else if (
            this.vehicle.loadingArea <
            this.data.request.items.reduce(
                (prev: number, item: any) => prev + item.size,
                0
            )
        )
            this.snackbar.open('Zu kleine Ladefläche', '', {
                duration: 2000,
            });
        else
            this.api
                .post(`/api/orders/requests/${this.data.request.id}`, {
                    vehicle: this.vehicle,
                })
                .subscribe((order) => {
                    this.dialogRef.close(order);
                });
    }
}

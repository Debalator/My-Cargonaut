import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api/api.service';

@Component({
    selector: 'app-order-request',
    templateUrl: './order-request.component.html',
    styleUrls: ['./order-request.component.scss'],
})
export class OrderRequestComponent {
    vehicle = null;

    constructor(
        public api: ApiService,
        public dialogRef: MatDialogRef<OrderRequestComponent>,
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

        this.api
            .post(`/api/orders/requests/${this.data.request.id}`, {
                vehicle: this.vehicle,
            })
            .subscribe((order) => {
                this.dialogRef.close(order);
            });
    }
}

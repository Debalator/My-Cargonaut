import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api/api.service';

@Component({
    selector: 'app-order-offer',
    templateUrl: './order-offer.component.html',
    styleUrls: ['./order-offer.component.scss'],
})
export class OrderOfferComponent {
    items: any[] = [];
    persons = 0;

    constructor(
        public api: ApiService,
        public dialogRef: MatDialogRef<OrderOfferComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { offer: any }
    ) {}

    applyItems(items: any[]) {
        this.items = { ...items };
    }

    cancel() {
        this.dialogRef.close(null);
    }

    book() {
        console.log('ORDERED');

        this.api
            .post(`/api/requests/offers/${this.data.offer.id}`, {
                items: this.items,
                persons: this.persons,
            })
            .subscribe((request) => {
                this.api
                    .post('/api/orders', {
                        offer: this.data.offer,
                        request,
                    })
                    .subscribe((order) => {
                        console.log(order);
                        this.dialogRef.close(order);
                    });
            });
    }
}

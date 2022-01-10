import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { OrderOfferComponent } from '../order-offer/order-offer.component';

@Component({
    selector: 'app-offers',
    templateUrl: './offers.component.html',
    styleUrls: ['./offers.component.scss'],
})
export class OffersComponent implements OnInit {
    offers: any[] = [];

    constructor(
        private api: ApiService,
        public dialog: MatDialog,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.api.get('/api/offers').subscribe((res) => {
            console.log(res);
            this.offers = res;
        });
    }

    openDialog(offerID: number) {
        const dialogRef = this.dialog.open(OrderOfferComponent, {
            width: '800px',
            data: {
                offer: this.offers.find((offer) => offer.id === offerID),
            },
        });

        dialogRef.afterClosed().subscribe((order) => {
            console.log(order);
            if (order) this.router.navigate(['/orders', order.id]);
        });
    }
}

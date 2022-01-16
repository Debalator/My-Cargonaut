import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
    offers: any[] = [];
    requests: any[] = [];
    isLoading = true;

    constructor(private api: ApiService, private router: Router) {}

    ngOnInit(): void {
        this.api.get('/api/users/orders').subscribe((orders) => {
            this.offers = orders.offers;
            this.requests = orders.requests;
            this.isLoading = false;
        });
    }

    openOrder(orderID: number) {
        this.router.navigate(['orders', orderID]);
    }
}

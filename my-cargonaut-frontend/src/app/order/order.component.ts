import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api/api.service';

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
    order: any = null;
    isLoading = true;

    constructor(private route: ActivatedRoute, private api: ApiService) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            const orderID = +params['id'];
            this.api.get(`/api/orders/${orderID}`).subscribe((order) => {
                console.log(order);
                this.order = order;
                this.isLoading = false;
            });
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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

    statusList = ['received', 'shipped', 'finished', 'canceled'];

    constructor(
        private route: ActivatedRoute,
        private api: ApiService,
        private snackbar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            const orderID = +params['id'];
            this.api.get(`/api/orders/${orderID}`).subscribe((order) => {
                this.order = order;
                this.isLoading = false;
            });
        });
    }

    onStatusChange(status: string) {
        this.api
            .patch(`/api/orders/${this.order.id}`, {
                status,
            })
            .subscribe(() => {
                this.snackbar.open('Bestellstatus geändert!', '', {
                    duration: 2000,
                });
            });
    }
}

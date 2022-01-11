import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-order-tracking',
    templateUrl: './order-tracking.component.html',
    styleUrls: ['./order-tracking.component.scss'],
})
export class OrderTrackingComponent implements OnInit {
    constructor() {}

    @Input() location: {
        latitude: number;
        longitude: number;
    } = {
        latitude: 0,
        longitude: 0,
    };

    ngOnInit(): void {}
}

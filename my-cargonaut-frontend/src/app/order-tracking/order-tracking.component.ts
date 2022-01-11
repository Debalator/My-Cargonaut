import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.scss']
})
export class OrderTrackingComponent implements OnInit {

  constructor() { }

  @Input() latitude: number = 0;
  @Input() longitude: number = 0;

  ngOnInit(): void {
  }

  position = {
    lat: this.latitude,
    lng: this.longitude,
  };

}

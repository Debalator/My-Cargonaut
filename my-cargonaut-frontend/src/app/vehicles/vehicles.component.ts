import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from '../api/api.service';

@Component({
    selector: 'app-vehicles',
    templateUrl: './vehicles.component.html',
    styleUrls: ['./vehicles.component.scss'],
})
export class VehiclesComponent implements OnInit {
    @Output() changeVehicleEvent = new EventEmitter<any>();

    vehicles: any[] = [];

    constructor(private api: ApiService) {}

    ngOnInit(): void {
        this.api.get('/api/vehicles').subscribe((res) => {
            this.vehicles = res;
        });
    }

    onChange(id: number) {
        const vehicle = this.vehicles.find((vehicle) => vehicle.id === id);
        if (vehicle) this.changeVehicleEvent.emit(vehicle);
    }
}
